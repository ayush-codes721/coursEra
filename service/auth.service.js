import { User } from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import bcrypt from "bcryptjs";
import { JwtService } from "./jwt.service.js";

export class AuthService {

    static async signup({ username, name, email, password, role = "user", interests }) {

        const user = await User.findOne({
            $or: [
                { username, },
                { email, }
            ]
        });
        if (user) {
            throw new ApiError(400, "user already exists");
        }

        const hashP = await bcrypt.hash(password, 10);
        const userData = {
            username,
            name,
            email,
            password: hashP,
            role,
            interests
        }

        const newUser = await User.create(userData);

        return newUser;

    }

    static async login({ username, password }) {

        const user = await User.findOne({ username });
        if (!user) {
            throw new ApiError(400, "user doesn't exists");
        }

        const isPtrue = await bcrypt.compare(password, user.password);
        if (!isPtrue) {
            throw new ApiError(400, "invalid credentials")
        }

        const token = JwtService.createToken({ id: user._id, username: user.username,role:user.role })
        return token;



    }

}