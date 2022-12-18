import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

// Structured Data in each ADMIN TABLE

const Admin = dbConfig.define('admin',{
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    profilePicture:{
        type: DataTypes.STRING,
    },
},{
    freezeTableName: true
});

export default Admin;