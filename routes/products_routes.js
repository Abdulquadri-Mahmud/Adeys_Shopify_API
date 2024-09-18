import express from 'express';
import { 
    createProducts, allProducts, 
    singleProducts, deleteProduct, 
    updateProduct
} from '../controller/products_controller.js';

const app = express();

app.post('/create-products', createProducts);
app.get('/all-products', allProducts);
app.get('/single-products/:id', singleProducts);
app.delete('/delete-products/:id', deleteProduct);
app.patch('/update-products/:id', updateProduct);

export default app;