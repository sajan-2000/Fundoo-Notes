import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
const jwt = require('jsonwebtoken');
import { sendResetPasswordEmail } from '../utils/sendEmail';
import { IUser } from '../interfaces/user.interface';

import user from '../models/user';

class UserService {
  private User = user(sequelize, DataTypes);

  //create a new user
  public signUp = async (userDetails) => {

    if (userDetails != null) {
      const hashedPassword = await bcrypt.hash(userDetails.password, 10);
      userDetails.password = hashedPassword;
      const data = await this.User.create(userDetails);
      return data;
    } else {
      return {
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: 'invalid details entered'
      };
    }
  };

  //loginUser
  public userLogin = async (userDetails) => {
    try {
      const user = await this.User.findOne({
        where: {
          email: userDetails.email
        }
      })

      console.log(user.dataValues.id);

      if (!user) {
        return {
          code: HttpStatus.NOT_FOUND,
          data: [],
          message: "user not found"
        }
      }

      let checkPassword = await bcrypt.compare(userDetails.password, user.password);

      if (!checkPassword) {
        return {
          code: HttpStatus.UNAUTHORIZED,
          data: [],
          message: 'Invalid email or password'
        };
      }

      const token = jwt.sign({ email: user.email, id: user.dataValues.id }, process.env.ACCESS_TOKEN_KEY);

      return {
        data: token,
        user: { email: user.email, name: user.firstName },
      }


    } catch (error) {
      console.log("Invalid data");
    }
  }

  public forgotPass = async (body) => {
    try {
      const checkUser = await this.User.findOne({
        where: {
          email: body.email
        }
      })
      if (!checkUser) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: 'No user found..!'
        }
      }
      let resetToken = jwt.sign({ email: checkUser.email }, process.env.RESET_TOKEN_KEY, { expiresIn: '1h' });

      await sendResetPasswordEmail(checkUser.email, resetToken);
      return resetToken;
    } catch (error) {
      console.error('Error in forgot password:', error);
      throw error;
    }
  }

  public resetpass = async (body) => {
    try {
      const hashPwd = await bcrypt.hash(body.password, 10);
      const user = await this.User.update({ password: hashPwd }, { where: { email: body.email } });
      return user;

    } catch (error) {
      return {
        data: [],
        message: error.message
      }
    }
  }

}

export default UserService;
