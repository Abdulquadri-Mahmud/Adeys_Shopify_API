import User from "../model/user_model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

export const signup = async (req, res, next) => {
    const { firstname, lastname, phone, email, address, password, avatar} = req.body;

    try {
        if (password.length <= 7) {
            return next(errorHandler(400, 'Please kindly choose a strong password! max(8)'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({firstname, lastname, phone,address, email, password: hashedPassword, avatar});

        await newUser.save();

        res.status(201).json('Account created successfully!');
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        if (password.length <= 7) {
            return next(errorHandler(400, 'Please kindly choose a strong password! max(8)'));
        }

        const verifyEmail = await User.findOne({email});

        if (!verifyEmail) {
            return next(errorHandler(404, 'User Not Found!'));
        }

        const validPassword = bcryptjs.compareSync(password, verifyEmail.password);

        if (!validPassword) {
            return next(errorHandler(404, 'Wrong Credentials!'));
        }

        const webtoken = jwt.sign({id: verifyEmail._id}, process.env.JWT_SERVICES);

        const { password: pass, ...rest } = verifyEmail._doc;

        res.cookie('access_token', webtoken, {httpOnly: true}).status(200).json(rest);

    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('Signed Out!');
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    const userID = req.params.id;

    const { firstname, lastname, phone, email, password, address, avatar} = req.body;

    try {
        const findUserId = await User.findById(userID);

        
        let userPassword = password;
        
        if (userPassword) {
            userPassword = bcryptjs.hashSync(password, 10);
        }
        
        if (!findUserId) {
            next(errorHandler(404, 'Account Not Found!'));
            return;
        }

        const updateUser = await User.findByIdAndUpdate(userID, {
            $set: {
                firstname, lastname, phone, email, userPassword, address, avatar
            }
        }, {new : true});

        const {password: pass, ...rest} = updateUser._doc;
        
        res.status(200).json(updateUser);
        
    } catch (error) {
        next(error)
    }
}

export const deleteAccount = async (req, res, next) => {
    const getUserParamsID = req.params.id;

    // if (req.user.id !== getUserParamsID) {
    //     return next(errorHandler(401, 'You can only deleted your account!'));
    // }
    const findUser = await User.findById(getUserParamsID);

    try {

        if (!findUser) {
            next(errorHandler(404, 'The Account You are trying to delete is not found'));
            return;
        }

        await User.findByIdAndDelete(getUserParamsID);
        res.clearCookie('access_token');

        res.status(200).json('Account has been deleted!');

    } catch (error) {
        next(error);
    }
}

export const allUsers = async (req, res, next) => {
    
    try {
        const excludePassword = {password : 0};

        const getUsers = await User.find({}, {excludePassword});

        // .sort({createdAt : -1});
        
        res.status(200).json(getUsers);

    } catch (error) {
        next(error)
    }
}