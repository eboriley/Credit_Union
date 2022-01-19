"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlConnection2 = exports.mysqlConnection = void 0;
const mysql_1 = __importDefault(require("mysql"));
const config_1 = require("../config/config");
exports.mysqlConnection = mysql_1.default.createConnection({
    host: config_1.dbConfiguration.db_host,
    user: config_1.dbConfiguration.db_user,
    password: config_1.dbConfiguration.db_password,
    database: config_1.dbConfiguration.db_name,
    port: config_1.dbConfiguration.db_port,
    multipleStatements: true,
});
exports.mysqlConnection.connect((err) => {
    if (!err)
        return console.error("Connection successful");
    if (err)
        return console.error(err, "Connection failed");
});
exports.mysqlConnection2 = mysql_1.default.createConnection({
    host: config_1.dbConfiguration.db_host,
    user: config_1.dbConfiguration.db_user,
    password: config_1.dbConfiguration.db_password,
    database: "arch_nk_isl_credit_union",
    port: config_1.dbConfiguration.db_port,
    multipleStatements: true,
});
exports.mysqlConnection2.connect((err) => {
    if (!err)
        return console.error("Connection successful");
    if (err)
        return console.error(err, "Connection failed");
});
