import express from "express";
import { signin, signOut, signup } from "../controller/user_controller.js";

const app = express();

app.post('/signup', signup);
app.post('/signin', signin);
app.get('/signout', signOut);

export default app;