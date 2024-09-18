import mongoose from "mongoose";
import Products from "../model/products_models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createProducts = async (req, res, next) => {
    const { name, quantity, price, image, description} = req.body;

    try {
        const products = await Products.create({
            name, quantity, price, image, description
        });

        await products.save();

        res.status(201).json('Products create successfully!');

    } catch (error) {
        next(error)
    }
}

export const allProducts = async (req, res, next) => {
    try {
        const allProducts = await Products.find({}).sort({createdAt: - 1});

        res.status(200).json(allProducts);

    } catch (error) {
        next(error)
    }
}

export const singleProducts = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(errorHandler(404, 'Product Not Found!'));
        }

        const getProducts = await Products.findOne({_id : id});

        if (!getProducts) {
            return next(errorHandler(404, 'Product Not Found!'));
        }

        res.status(200).json(getProducts);
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(errorHandler(404, 'Product Not Found!'));
        }

        const getProductsAndDelete = await Products.findByIdAndDelete({ _id : id});

        if (!getProductsAndDelete) {
            return next(errorHandler(404, 'Product Not Found!'));
        }
        
        res.status(200).json('Product has been deleted successdully!');
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(errorHandler(404, 'Product Not Found!'));
        }

        const getProductsAndDelete = await Products.findByIdAndUpdate({ _id : id}, {...req.body});

        if (!getProductsAndDelete) {
            return next(errorHandler(404, 'Product Not Found!'));
        }
        
        res.status(200).json('Product has been updated successdully!');
    } catch (error) {
        next(error)
    }
}