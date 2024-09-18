import mongoose from "mongoose";

var productsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: [],
        require: true
    },
    description: {
        type: String,
        require: true
    },
}, {timestamps: true});

const Products = mongoose.model('product', productsSchema);

export default Products;