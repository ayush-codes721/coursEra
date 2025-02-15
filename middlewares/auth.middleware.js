import { User } from "../model/user.model.js";
import { JwtService } from "../service/jwt.service.js";
import { ApiError } from "../utils/apiError.js";

export class AuthMiddleware {

    static async isUserAuthenticated(req, res, next) {
        try {
            const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Get token from header
            if (!token) {
                throw new ApiError(401, "Access denied. No token provided.");
            }
            
            const decoded = JwtService.verifyToken(token);
            
            const user = await User.findById(decoded.id).select("-password");
            req.user = user;
            next();

        } catch (error) {

            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });

        }
    }

    static async isAdminAuthenticated(req,res,next){
        try {

            if (!req.user) {
                throw new ApiError(403, "Access denied. User not authenticated.");
            }

            if (req.user.role !== "admin") {
                throw new ApiError(403, "Access denied. Admins only.");
            }

            next();
            
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
            
        }
    }

}