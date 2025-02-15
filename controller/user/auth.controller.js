import { AuthService } from "../../service/auth.service.js"; // Ensure correct import

export class AuthController {
    static async signup(req, res) {
        try {
            const { username, name, email, password, interests } = req.body;

            console.log("registering user ..");
            

            const user = await AuthService.signup({ username, name, email, password, role:"user", interests });

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    interests: user.interests,
                    wallet:user.wallet
                }
            });

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error hai"
            });
        }
    }

    static async adminSignup(req,res) {

        try {

            const { username, name, email, password, interests } = req.body;


            const user = await AuthService.signup({ username, name, email, password, role:"admin", interests });

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    interests: user.interests,
                    wallet:user.wallet
                }
            });

            
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
            
        }
        
    }

    static async signin(req, res) {
        try {
            const { username, password } = req.body;

            const token = await AuthService.login({ username, password });

            return res.status(200).cookie("token", token,{
                httpOnly: true, // Security option
                maxAge: 60 * 60 * 1000 // 1 hour in milliseconds

            }).json({
                success: true,
                message: "User logged in successfully",
                token
            });

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }

    static async getProfile(req, res) {

        try {


            const user = req.user;
            return res.status(200).json({
                success: true,
                message: "User profile",
                user: {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    interests: user.interests,
                    purchasedCourses:user.purchasedCourses,
                    wallet:user.wallet
                }
            });


        } catch (error) {
            
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });

        }

    }
}
