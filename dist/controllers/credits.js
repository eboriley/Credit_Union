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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCredit = exports.getAllCreditsByDateAndId = exports.getAllCreditsByDate = exports.getCreditsByOneMember = exports.addCredit = exports.getAllCredits = void 0;
const mysqlConn_1 = require("../config/mysqlConn");
const getAllCredits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM credits`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllCredits = getAllCredits;
const addCredit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let credit = req.body;
    const sql = `INSERT INTO credits (amount, timestamp, description, staff_id)
  VALUES
  (${credit.amount}, CURRENT_TIMESTAMP, "${credit.description}", "${credit.staff_id}")`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.json("Credit records added to member successfully!");
        if (err)
            return res.json(err);
    });
});
exports.addCredit = addCredit;
const getCreditsByOneMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM credits WHERE staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getCreditsByOneMember = getCreditsByOneMember;
const getAllCreditsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body;
    const sql = `SELECT * FROM credits WHERE timestamp BETWEEN 
  ? AND ?`;
    mysqlConn_1.mysqlConnection.query(sql, [date.from, date.to], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllCreditsByDate = getAllCreditsByDate;
const getAllCreditsByDateAndId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body;
    const sql = `SELECT * FROM credits WHERE staff_id = ? AND timestamp BETWEEN 
  ? AND ?`;
    mysqlConn_1.mysqlConnection.query(sql, [date.staff_id, date.from, date.to], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllCreditsByDateAndId = getAllCreditsByDateAndId;
const deleteCredit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM credits WHERE credit_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.deleteCredit = deleteCredit;
