"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMember = void 0;
const mysql_1 = __importDefault(require("mysql"));
const config_1 = require("../config/config");
const mysqlConnection = mysql_1.default.createConnection({
    host: config_1.dbConfiguration.db_host,
    user: config_1.dbConfiguration.db_user,
    password: config_1.dbConfiguration.db_password,
    database: config_1.dbConfiguration.db_name,
    port: config_1.dbConfiguration.db_port,
    multipleStatements: true,
});
mysqlConnection.connect((err) => {
    if (!err)
        return console.error("Connection successful");
    if (err)
        return console.error(err, "Connection failed");
});
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let member = req.body;
    const sql = `INSERT INTO members (staff_id, f_name, surname, other_name, photo, dob, gender,
         phone_1, phone_2, email, next_of_kin, next_of_kin_phone, relationship)
       VALUES 
       (?, ?,?,?,?,
       ?, ?,?, ?, ?,
        ?, ?, ?)`;
    mysqlConnection.query(sql, [
        member.staffID, member.fName, member.surname, member.otherName,
        member.photo, member.dob, member.gender, member.phone1, member.phone2,
        member.email, member.nextOfKin, member.nextOfKinPhone, member.relationship
    ], (err, result) => {
        if (!err)
            return res.send("member records inserted successfully");
        if (err)
            return console.error(err);
    });
});
exports.addMember = addMember;
