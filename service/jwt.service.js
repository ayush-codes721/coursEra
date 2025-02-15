import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { ApiError } from '../utils/apiError.js';
config();
export class JwtService{

    static createToken(payload){
        return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});

    }

    static verifyToken(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            return decoded;
            
        } catch (error) {
            throw new ApiError(400,"invlaid token");
            
        }
    }
}