import mongoose from "mongoose";

var productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    deal: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: [],
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Products = mongoose.model('product', productsSchema);

export default Products;