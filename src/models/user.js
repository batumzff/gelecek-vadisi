const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already in use!",
      },
      validate: { isEmail: true, notNull: true },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters long",
        },
        is: {
          args: /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>?,./\\-]*$/,
          msg: "Password can only contain alphanumeric characters and special characters",
        },
      },
    },
    userType: {
      type: DataTypes.ENUM("admin", "manager", "user"),
      defaultValue: "user",
      validate: {
        isIn: {
          args: [["admin", "manager", "user"]],
          msg: "Must be either 'admin', 'manager' or 'user'",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;
