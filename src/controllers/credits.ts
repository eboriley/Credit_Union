import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";

type Credit = {
  amount: number;
  timestamp: any;
  description: string;
  staff_id: string;
};

type DateInfo = {
  staff_id: string;
  from: string;
  to: string;
};

export const getAllCredits = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM credits`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const addCredit = async (req: Request, res: Response): Promise<void> => {
  let credit: Credit = req.body;
  const sql: string = `INSERT INTO credits (amount, timestamp, description, staff_id)
  VALUES
  (${credit.amount}, CURRENT_TIMESTAMP, "${credit.description}", "${credit.staff_id}")`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.json("Credit records added to member successfully!");
    if (err) return res.json(err);
  });
};

export const getCreditsByOneMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM credits WHERE staff_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const getAllCreditsByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const date: DateInfo = req.body;
  const sql: string = `SELECT * FROM credits WHERE timestamp BETWEEN 
  ? AND ?`;
  mysqlConnection.query(sql, [date.from, date.to], (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};

export const getAllCreditsByDateAndId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const date: DateInfo = req.body;
  const sql: string = `SELECT * FROM credits WHERE staff_id = ? AND timestamp BETWEEN 
  ? AND ?`;
  mysqlConnection.query(
    sql,
    [date.staff_id, date.from, date.to],
    (err, result): unknown => {
      if (!err) return res.json(result);
      if (err) return res.json(err);
    }
  );
};

export const deleteCredit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `DELETE FROM credits WHERE credit_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) return res.json(result);
    if (err) return res.json(err);
  });
};
