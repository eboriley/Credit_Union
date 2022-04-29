"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = require("./config");
exports.mysqlConnection = mysql_1.default.createConnection({
    host: config_1.dbConfiguration.db_host,
    user: config_1.dbConfiguration.db_user,
    password: config_1.dbConfiguration.db_password,
    database: config_1.dbConfiguration.db_name,
    // port: dbConfiguration.db_port,
    multipleStatements: true,
});
exports.mysqlConnection.connect((err) => {
    if (!err)
        return console.error("Connection successful");
    if (err)
        return console.error(err, "Connection failed");
});
