import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const options = {
    basic:{
        abortEarly: false,
        convert: true,
        allowUnknown: false
    }
};

const createUserSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string().email({minDomainSegments: 2,tlds: { allow: ['com', 'net'] }})
});

export const createValidateUser = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    let option = options.basic;
    let result = createUserSchema.validate(req.body, option);
    console.log(result);
    console.log("!!!!!!!!!!!!!!!!!!!")
    if(result.value?.error?.length)
        next()
    else
        res.status(400).json({error: result.error?.details})
}
