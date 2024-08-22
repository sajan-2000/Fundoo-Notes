/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    let user: any;
    if (req.path.includes('/resetpwd')) {
      user = await jwt.verify(bearerToken, process.env.RESET_TOKEN_KEY);
      req.body.email = user.email;
    } else {
      user = await jwt.verify(bearerToken, process.env.ACCESS_TOKEN_KEY);
      req.body.createdBy = user.id;
    }

    next();
  } catch (error) {
    next(error);
  }
};
