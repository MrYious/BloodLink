import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

// Structured Data in each CONTENT TABLE

const Content = dbConfig.define('content',{
    title:{
        type: DataTypes.STRING
    },
    content:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

export default Content;