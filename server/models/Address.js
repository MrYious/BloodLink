import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

// Structured Data in each ADDRESS TABLE

const Address = dbConfig.define('address',{
    userID:{
        type: DataTypes.INTEGER
    },
    region:{
        type: DataTypes.STRING
    },
    province:{
        type: DataTypes.STRING
    },
    city:{
        type: DataTypes.STRING
    },
    barangay:{
        type: DataTypes.STRING
    },
    addressLine1:{
        type: DataTypes.STRING
    },
    addressLine2:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

export default Address;