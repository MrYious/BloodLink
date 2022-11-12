import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

// Structured Data in each USER TABLE

const User = dbConfig.define('user',{
    firstname:{
        type: DataTypes.STRING
    },
    lastname:{
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
    mobileNumber:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    profilePicture:{
        type: DataTypes.STRING,
    },
    bloodGroup:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    shortBio:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

export default User;