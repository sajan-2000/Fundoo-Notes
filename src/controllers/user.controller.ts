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

      if (data == null) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          code: HttpStatus.UNAUTHORIZED,
          message: 'Invalid email or password'
        })
      }

      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
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
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
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
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'reset successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
