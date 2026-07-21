import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authenticateUser = async(req, res, next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decodedToken.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const authenticateSeller = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decodedToken.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if(user.role !== "seller"){
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}