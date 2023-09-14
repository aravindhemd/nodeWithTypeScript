import { Request, Response } from 'express';
import { User } from './users.model';
import { SuccessResponse } from '../responses/successResponse';
import { ErrorResponse } from '../responses/errorResponse';
import * as exceljs from 'exceljs';

export const createUserTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.sync({ force: false });
    const response = new SuccessResponse(user, "User Table Created successfully");
    res.send(response);
  } catch (err) {
    console.log(err);
    const response = new ErrorResponse("Error creating user table", 500);
    res.status(response.statusCode).json(response);
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    let userData = req.body;
    const user = await User.create(userData);
    const response = new SuccessResponse(user, "User Table Created successfully");
    res.send(response);
  } catch (err) {
    console.log(err);
    const response = new ErrorResponse("Error creating user", 500);
    res.status(response.statusCode).json(response);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    let userData = req.body;
    const user = await User.update(userData, { where: { id: userData.id } });
    const response = new SuccessResponse(user, "User Details updated successfully");
    res.send(response);
  } catch (err) {
    console.log(err);
    // throw new Error("Error updating user");
    const response = new ErrorResponse("Error creating user", 500);
    res.status(response.statusCode).json(response);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.params.id);
    console.log(req.query.id)
    const user = await User.destroy({ where: { id: req.params.id } });
    console.log(user);
    console.log("user");
    res.send(req.params.id + " deleted sucessfully");
  } catch (err) {
    console.log(err);
    // throw new Error("Error deleting user");
    res.send(err);
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user:User[] = await User.findAll();
    const response = new SuccessResponse(user, "User Details updated successfully");
    res.send(response);
  } catch (err) {
    console.log(err);
    // throw new Error("Error creating user");
    res.send(err);
  }
}

export const downloadUser = async (req: Request, res: Response): Promise<void> => {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Sample Sheet');
  // Add some data to the worksheet
  worksheet.columns = [
    { header: 'id', key: 'id', width: 20 },
    { header: 'username', key: 'username', width: 20 },
    { header: 'email', key: 'email', width: 20 },
    { header: 'createdAt', key: 'createdAt', width: 20 },
    { header: 'updatedAt', key: 'updatedAt', width: 10 },
  ];

  const user:User[] = await User.findAll();
  console.log(user)
  console.log("===========user==============");
  worksheet.addRows(user);

  console.time("================================");
  for(let i:number = 10;i< 500001;i++){
    let user = {id:i, name:`name${i}`, email: `email${i}`,createdAt: new Date(), updatedAt: new Date()};
    worksheet.addRow(user);
  }
  console.timeEnd("================================");

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="example.xlsx"');
  // Send the Excel file as a response
  await workbook.xlsx.write(res);
  res.end();
  // res.send(user);
}