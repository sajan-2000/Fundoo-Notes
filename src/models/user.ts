'use strict';
import { Model } from 'sequelize';
import { IUser } from '../interfaces/user.interface';

export default (sequelize, DataTypes) => {
  class User extends Model<IUser> implements IUser {
    public firstName;
    public lastName;
    public email;
    public phoneno;
    public password;
    
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneno: DataTypes.BIGINT,
      password:DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail:true
        }
      },
    },
    {
      sequelize,
      modelName: 'user'
    }
  );
  return User;
};
