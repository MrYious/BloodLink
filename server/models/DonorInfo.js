import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

// Structured Data in each DONOR INFO TABLE

const DonorInfo = dbConfig.define('donorinfo',{
    userID:{
        type: DataTypes.INTEGER
    },
    avgRating:{
        type: DataTypes.INTEGER
    },
    totalDonations:{
        type: DataTypes.INTEGER
    },
    healthStatus:{
        type: DataTypes.STRING
    },
    healthConditions:{
        type: DataTypes.STRING
    },
    lastDonation:{
        type: DataTypes.DATE
    },
},{
    freezeTableName: true
});

export default DonorInfo;