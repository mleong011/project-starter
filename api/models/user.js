'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    getFullname() {
      return [this.firstName, this.lastName].join(' ');
    }
  }

  User.init({
    // firstName: { type: DataTypes.STRING },
    // lastName: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
      isEmail: true,
      },
    name: {type: DataTypes.STRING},
    accessToken: {type: DataTypes.STRING},
    userId: {type: DataTypes.STRING},
    },
    

  }, 
  {
    sequelize,
    modelName: 'user'
  });

  User.associate = (models) => {
    // associations can be defined here
  };


  // User.beforeSave((user, options) => {
  //   if(user.password) {
  //     user.passwordHash = bcrypt.hashSync(user.password, 10);
  //   }
  // });

  
  return User;
};