/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();
  
  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
    try {
      const data = await this.UserService.signUp(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  
  public userLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
    try {
      const data = await this.UserService.userLogin(req.body);

      if (data.code !== HttpStatus.OK) {
        return res.status(data.code).json({
          code: data.code,
          message: data.message,
        });
      }
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Logged in successfully'
      });

    } catch (error) {
      next(error);
    }
  };

  public forgotPass = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
      const data = await this.UserService.forgotPass(req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Token sent successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public resetpass = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
      const data = await this.UserService.resetpass(req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        message: 'reset successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
