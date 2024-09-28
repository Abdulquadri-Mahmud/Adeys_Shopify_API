import User from "../model/user_model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { firstname, lastname, phone, email, address, password, avatar} = req.body;

    try {
        if (password.length <= 7) {
            return next(errorHandler(400, 'please kindly choose a strong password! max(8)'));
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
        const verifyEmail = User.findOne({email});

        if (!verifyEmail) {
            return next(errorHandler(404, 'User Not Found!'));
        }

        const validPassword = bcryptjs.compareSync(password, verifyEmail.password);

        if (!validPassword) {
            return next(errorHandler(404, 'Wrong Credentials!'));
        }

        const webtoken = jwt.sign({id: verifyEmail._id}, process.env.JSON_SERVICES);

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
    const userID = req.params.id

    try {
        
    } catch (error) {
        next(error)
    }
}