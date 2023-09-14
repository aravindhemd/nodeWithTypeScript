import { Router } from 'express';
import { createUser, createUserTable, updateUser, deleteUser, getAllUsers, downloadUser } from './users.controller';
import {createValidateUser} from "./users.validator";

const userRoutes = Router();

userRoutes.post('/create', createValidateUser , createUser);

userRoutes.get('/createTable', createUserTable);

userRoutes.put('/update', updateUser);

userRoutes.delete('/delete/:id', deleteUser);

userRoutes.get('/getAllUsers', getAllUsers);

userRoutes.get('/download-user', downloadUser);
export default userRoutes;