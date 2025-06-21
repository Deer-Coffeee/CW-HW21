import express, {Request, Response} from "express";

import asyncHandler from "express-async-handler"

import {EmployeeDto} from "../model/Employee.js";

import {AccountController} from "../controllers/AccountController.js";

import {AuthRequest, LoginData} from "../utils/timeControlTypes.js";

import {authorize} from "../middleware/authorize.js";

import {Role} from "../utils/timeControlTypes.js";

export const accountRouter = express.Router()

const controller = new AccountController();


accountRouter.post('/', authorize(Role.HR),
asyncHandler(async (req:Request, res:Response) =>{

const body = req.body as EmployeeDto;
const result = await controller.addEmployee(body);

res.status(201).json(result);
}));


accountRouter.get('/', authorize(Role.HR, Role.MNG, Role.SUP),
asyncHandler(async (req: Request, res: Response) =>{

const result = await controller.getAllEmployees();

res.json(result);
}));


accountRouter.put('/', authorize(Role.HR),
asyncHandler(async (req: Request, res: Response) =>{

const body = req.body as EmployeeDto;
const result = await controller.updateEmployee(body);

res.json(result);
}));


accountRouter.get('/account', authorize(Role.HR, Role.MNG, Role.SUP, Role.CREW),
asyncHandler(async (req: Request, res: Response) =>{

const {id} = req.query;
const result = await  controller.getEmployeeById(id as string);

res.json(result);
}));


accountRouter.patch('/account', authorize(Role.HR, Role.MNG, Role.SUP, Role.CREW),
asyncHandler(async (req: Request, res: Response) =>{

const {id} = req.query;
await controller.changePassword(id as string, req.body.newPassword as string);

res.send();
}));


accountRouter.delete('/account', authorize(Role.HR),
asyncHandler(async (req: Request, res: Response) =>{

const {id} = req.query;
const result =  await controller.deleteEmployee(id as string);

res.json(result);
}));


accountRouter.patch('/role', authorize(Role.HR, Role.MNG),
asyncHandler(async (req: Request, res: Response) =>{

const {id, newRole} = req.query;
const result =  await controller.setRole(id as string, newRole as string);

res.json(result);
}));


accountRouter.post('/login', asyncHandler(async (req: AuthRequest, res: Response) =>{

const body = req.body as LoginData;
const token = await controller.login(body);

res.json({token});
}));
