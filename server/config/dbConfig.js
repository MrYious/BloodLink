import { Sequelize } from "sequelize";

const dbConfig = new Sequelize(
    'bloodlink',
    'root',
    '',
    {
        host: "localhost",
        dialect: "mysql"
    }
);

export default dbConfig;