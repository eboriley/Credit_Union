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
const mysqlConn_1 = require("../config/mysqlConn");
exports.addDeduction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deduction = req.body;
    const sql = `INSERT INTO loan_deductions (amount, description, timestamp, loan_id)
    VALUES (?,?,CURRENT_TIMESTAMP,?)`;
    mysqlConn_1.mysqlConnection.query(sql, [deduction.amount, deduction.description, [deduction.loan_id]], (err, result) => {
        if (!err)
            return res.send("Credit was successfully added to loan account");
        if (err)
            return res.send("Unable to credit loan to account" + err.message);
    });
});
exports.editDeduction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deduction = req.body;
    const sql = `UPDATE loan_deductions SET amount = ?, description =?,
    timestamp = CURRENT_TIMESTAMP, loan_id = ? WHERE deduction_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [deduction.amount, deduction.description, deduction.loan_id, req.params.id], (err, result) => {
        if (!err)
            return res.send("Loan credit record successfully updated!");
        if (err)
            return res.send("Unable to update loan credit record" + err.message);
    });
});
exports.getAllDeductions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM loan_deductions`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.send(result);
        if (err)
            return res.send("Unable to retrieve all credit at the moment" + err.message);
    });
});
exports.getAllDeductionsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body;
    const sql = `SELECT * FROM loan_deductions WHERE timestamp BETWEEN 
  ? AND ?`;
    mysqlConn_1.mysqlConnection.query(sql, [date.from, date.to], (err, result) => {
        if (!err)
            return res.send(result);
        if (err)
            return res.send("Unable to retrieve all credit at the moment" + err.message);
    });
});
exports.getAllDeductionsByDateAndId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body;
    const sql = `SELECT * FROM loan_deductions WHERE loan_id = ? AND timestamp BETWEEN 
  ? AND ?`;
    mysqlConn_1.mysqlConnection.query(sql, [date.loan_id, date.from, date.to], (err, result) => {
        if (!err)
            return res.send(result);
        if (err)
            return res.send("Unable to retrieve all credit at the moment" + err.message);
    });
});
exports.deleteDeduction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM loan_deductions WHERE deduction_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.send("Deduction record deleted successfully!");
        if (err)
            return res.send("Unable to delete record" + err.message);
    });
});
exports.getDeductionsByLoanId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM loan_deductions where loan_id = ?`;
    const deduction = req.body;
    mysqlConn_1.mysqlConnection.query(sql, [deduction.loan_id], (err, result) => {
        if (!err)
            return res.send(result);
        if (err)
            return res.send("Unable to retrieve all credit at the moment" + err.message);
    });
});
