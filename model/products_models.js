import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid' 

const generateTrackingId = () => {
    const number = 100000
    return Math.floor(1000 * Math.random() * number).toString().slice(0, 5);
}

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
        type: Number,
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
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    trackingId : {
        type: String,
        unique: true,
        default : generateTrackingId
    },
}, {timestamps: true});

const Products = mongoose.model('product', productsSchema);

export default Products;