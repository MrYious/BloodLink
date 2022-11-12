import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig";

const { DataTypes } = Sequelize;

// Structured Data in each ADMIN TABLE

const Admin = dbConfig.define('admin',{
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

export default Admin;