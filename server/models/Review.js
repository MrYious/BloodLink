import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

// Structured Data in each REVIEW TABLE

const Review = dbConfig.define('review',{
    donorRequestID:{
        type: DataTypes.STRING
    },
    comment:{
        type: DataTypes.STRING(300)
    },
    rating:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

export default Review;