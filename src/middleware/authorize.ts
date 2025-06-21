import {NextFunction, Response} from "express";

import {AuthRequest} from "../utils/timeControlTypes.js";

import {getError} from "../utils/tools.js";


export const authorize =
(...allowedRoles: string[]) =>{

return (req: AuthRequest, res: Response, next: NextFunction) =>{

if(!req.role || req.role.length === 0){

throw new Error(getError(401, "Unauthorized: no roles found"))}

const hasAccess = req.role.some(role => allowedRoles.includes(role));

if(!hasAccess){
throw new Error(getError(403, "Forbidden: insufficient role"))}

next();}
}
