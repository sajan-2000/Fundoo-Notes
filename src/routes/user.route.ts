import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.post('', this.UserValidator.signUp, this.UserController.signUp);
    
    this.router.post('/login', this.UserValidator.emailValidate, this.UserController.userLogin);
    
    this.router.post('/forgotpassword', this.UserController.forgotPass);

    this.router.post('/resetpwd', userAuth, this.UserController.resetpass);
  };


  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
