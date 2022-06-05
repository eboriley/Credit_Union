import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";
const ReportGenerator = require("../ReportGenerator");

type Transaction = {
  credit: number;
  debit: number;
  month: string;
  year: string;
  timestamp: any;
  date: any;
  description: string;
  staff_id: string;
};

type DateInfo = {
  staff_id: string;
  from: string;
  to: string;
};

export const getAllTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM transactions`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const getAllTransactionsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM transactions where transaction_id = ?`;
  mysqlConnection.query(sql,[req.params.id], (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const getAllTransactionsByMemberId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM transactions where staff_id = ?`;
  mysqlConnection.query(sql,[req.params.id], (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const getAllMonthlyDues = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM transactions WHERE description = "monthly dues"`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const getAllMonthlyDuesByMemberID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT members.f_name, members.surname, transactions.transaction_id, CONCAT(transactions.month,', ',transactions.year) as period, transactions.month, transactions.year, CAST(transactions.date AS DATE)date, transactions.description, transactions.credit
  from transactions INNER JOIN members ON 
  transactions.staff_id = members.staff_id
  WHERE transactions.description = "Monthly dues" AND transactions.staff_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};


export const getAllTransactionsQuery = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT members.f_name, members.surname, transactions.* FROM transactions 
  INNER JOIN members ON  transactions.staff_id = members.staff_id
  WHERE description LIKE ? OR transactions.staff_id LIKE ?`;
  mysqlConnection.query(sql,   [
    "%" + req.params.term + "%",
    "%" + req.params.term + "%",
  ], (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const getRecentlyAddedTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT members.f_name, members.surname, transactions.* FROM transactions 
  INNER JOIN members ON  transactions.staff_id = members.staff_id 
  ORDER BY transactions.transaction_id DESC LIMIT ${req.query.limit}`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const addMonthlyDues = async (
  req: Request,
  res: Response
): Promise<void> => {
  let transaction: Transaction = req.body;
  const sql: string = `INSERT INTO transactions (timestamp,date, description, credit, debit, staff_id, month, year)
  VALUES
  (CURRENT_TIMESTAMP, "${transaction.date}", "${transaction.description}",${transaction.credit}, 0.00,  "${transaction.staff_id}", "${transaction.month}", "${transaction.year}")`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.json("Monthly dues added to member successfully!");
    if (err) return res.json(err);
  });
};

export const removeMonthlyDues = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `DELETE FROM transactions WHERE transaction_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) return res.json("Records was deleted successfully");
    if (err) return res.json(err);
  });
};


