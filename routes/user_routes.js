import express from "express";
import { allUsers, deleteAccount, signin, signOut, signup, updateUser } from "../controller/user_controller.js";

const app = express();

app.post('/signup', signup);
app.post('/signin', signin);
app.get('/signout', signOut);
app.patch('/update/:id', updateUser);
app.delete('/delete/:id', deleteAccount);
app.get('/all-user', allUsers);

export default app;