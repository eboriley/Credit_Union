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
const ReportGenerator = require("../ReportGenerator");
exports.getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM transactions`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllMonthlyDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM transactions WHERE description = "monthly dues"`;
    mysqlConn_1.mysqlConnection.query(sql, (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.getAllMonthlyDuesByMemberID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.addMonthlyDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.removeMonthlyDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM transactions WHERE transaction_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.json("Montly dues deleted successfully");
        if (err)
            return res.json(err);
    });
});
exports.getTransactionByDateAndId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dateInfo = req.body;
    const sql = `SELECT members.staff_id, members.f_name, members.surname, members.other_name, members.institution, members.phone_1,members.phone_2, members.photo, CONCAT(transactions.month,', ',transactions.year) as period, transactions.date, transactions.description,
  CASE transactions.credit 
  WHEN 0.00 THEN "-" 
  ELSE transactions.credit 
  END 
  AS credit,
  CASE transactions.debit
  WHEN 0.00 THEN "-"
  ELSE transactions.debit
  END
  AS debit, 
  SUM(transactions.credit - transactions.debit) OVER (ORDER BY transactions.date) as balance from transactions INNER JOIN members ON 
  transactions.staff_id = members.staff_id
  WHERE transactions.staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err) {
            console.log(dateInfo);
            const currentDate = (somedate) => {
                const date = new Date(somedate);
                return date;
            };
            const minDate = (somedate) => {
                const date = new Date(somedate);
                return date;
            };
            const maxDate = (somedate) => {
                const date = new Date(somedate);
                return date;
            };
            const returnedStatement = [];
            for (let i = 0; i < result.length; i++) {
                if (currentDate(result[i].date) >= minDate(dateInfo.from) &&
                    currentDate(result[i].date) <= maxDate(dateInfo.to)) {
                    returnedStatement.push(result[i]);
                }
            }
            const ddd = returnedStatement[0];
            //dateBeforeMindate is the first object in returnedStatement
            //we need the first object in returnedStaement in order to get the date
            //of the object before it in the main array, which is results array
            const dateBeforeMinDate = result.findIndex((obj) => {
                return obj.date === ddd.date;
            });
            //this is how we get the object before the first object in the result array
            if (result[dateBeforeMinDate - 1]) {
                returnedStatement.push(result[dateBeforeMinDate - 1]);
            }
            else {
                returnedStatement.push({ balance: 0 });
            }
            const dates = {
                from: dateInfo.from,
                to: dateInfo.to,
            };
            returnedStatement.push(dates);
            let credit = 0;
            let debit = 0;
            for (let i = 0; i < returnedStatement.length - 2; i++) {
                if (returnedStatement[i].credit !== "-") {
                    credit += parseFloat(returnedStatement[i].credit);
                }
                if (returnedStatement[i].debit !== "-") {
                    debit += parseFloat(returnedStatement[i].debit);
                }
            }
            const totals = {
                credit: credit,
                debit: debit,
            };
            returnedStatement.push(totals);
            const rg = new ReportGenerator(returnedStatement);
            rg.generate();
            res.json("successful");
        }
        if (err)
            return res.json(err);
    });
});
