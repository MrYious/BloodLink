import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig";

const { DataTypes } = Sequelize;

// Structured Data in each USER TABLE

const User = dbConfig.define('user',{
    addressID:{
        type: DataTypes.INTEGER
    },
    lastname:{
        type: DataTypes.STRING
    },
    firstname:{
        type: DataTypes.STRING
    },
    middlename:{
        type: DataTypes.STRING
    },
    gender:{
        type: DataTypes.STRING
    },
    age:{
        type: DataTypes.INTEGER
    },
    mobileNo:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    profilePicture:{
        type: DataTypes.STRING,
    },
    bloodType:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    accountType:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

export default User;