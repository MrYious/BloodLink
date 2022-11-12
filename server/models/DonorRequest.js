import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig";

const { DataTypes } = Sequelize;

// Structured Data in each DONOR REQUEST TABLE

const DonorRequest = dbConfig.define('donorrequest',{
    donorID:{
        type: DataTypes.INTEGER
    },
    seekerID:{
        type: DataTypes.INTEGER
    },
    message:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    reason:{
        type: DataTypes.STRING
    },
    clinicName:{
        type: DataTypes.STRING
    },
    donationDate:{
        type: DataTypes.DATE
    },
},{
    freezeTableName: true
});

export default DonorRequest;