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
exports.removeMonthlyDues = exports.addMonthlyDues = exports.getRecentlyAddedTransactions = exports.getAllTransactionsQuery = exports.getAllMonthlyDuesByMemberID = exports.getAllMonthlyDues = exports.getAllTransactionsByMemberId = exports.getAllTransactionsById = exports.getAllTransactions = void 0;
const mysqlConn_1 = require("../config/mysqlConn");
const ReportGenerator = require("../ReportGenerator");
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM transactions`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllTransactions = getAllTransactions;
const getAllTransactionsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM transactions where transaction_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllTransactionsById = getAllTransactionsById;
const getAllTransactionsByMemberId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM transactions where staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllTransactionsByMemberId = getAllTransactionsByMemberId;
const getAllMonthlyDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM transactions WHERE description = "monthly dues"`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllMonthlyDues = getAllMonthlyDues;
const getAllMonthlyDuesByMemberID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT members.f_name, members.surname, transactions.transaction_id, CONCAT(transactions.month,', ',transactions.year) as period, transactions.month, transactions.year, CAST(transactions.date AS DATE)date, transactions.description, transactions.credit
  from transactions INNER JOIN members ON 
  transactions.staff_id = members.staff_id
  WHERE transactions.description = "Monthly dues" AND transactions.staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllMonthlyDuesByMemberID = getAllMonthlyDuesByMemberID;
const getAllTransactionsQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT members.f_name, members.surname, transactions.* FROM transactions 
  INNER JOIN members ON  transactions.staff_id = members.staff_id
  WHERE description LIKE ? OR transactions.staff_id LIKE ?`;
    mysqlConn_1.mysqlConnection.query(sql, [
        "%" + req.params.term + "%",
        "%" + req.params.term + "%",
    ], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllTransactionsQuery = getAllTransactionsQuery;
const getRecentlyAddedTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT members.f_name, members.surname, transactions.* FROM transactions 
  INNER JOIN members ON  transactions.staff_id = members.staff_id 
  ORDER BY transactions.transaction_id DESC LIMIT ${req.query.limit}`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getRecentlyAddedTransactions = getRecentlyAddedTransactions;
const addMonthlyDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = req.body;
    const sql = `INSERT INTO transactions (timestamp,date, description, credit, debit, staff_id, month, year)
  VALUES
  (CURRENT_TIMESTAMP, "${transaction.date}", "${transaction.description}",${transaction.credit}, 0.00,  "${transaction.staff_id}", "${transaction.month}", "${transaction.year}")`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.json("Monthly dues added to member successfully!");
        if (err)
            return res.json(err);
    });
});
exports.addMonthlyDues = addMonthlyDues;
const removeMonthlyDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM transactions WHERE transaction_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.json("Records was deleted successfully");
        if (err)
            return res.json(err);
    });
});
exports.removeMonthlyDues = removeMonthlyDues;
