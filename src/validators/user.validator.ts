import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public signUp = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(4).required(),
      lastName: Joi.string().min(4).required(),
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(8).required(),
      phoneno: Joi.string().min(10).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  public emailValidate = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(8).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("Provide email");
      next(error);
    }
    next();
  };

}

export default UserValidator;
