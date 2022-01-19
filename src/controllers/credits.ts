import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";

type Credit = {
  amount: number;
  timestamp: any;
  description: string;
  staffID: string;
};

type DateInfo = {
  staffID: string;
  from: string;
  to: string;
};

export const getAllCredits = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM credits`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.send(result);
    if (err) return console.error(err);
  });
};

export const addCredit = async (req: Request, res: Response): Promise<void> => {
  let credit: Credit = req.body;
  const sql: string = `INSERT INTO credits (amount, timestamp, description, staff_id)
  VALUES
  (${credit.amount}, CURRENT_TIMESTAMP, "${credit.description}", "${credit.staffID}")`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.send("Credit records added to member successfully!");
    if (err) return res.send("Could not add credit to member" + err.message);
  });
};

export const getCreditsByOneMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM credits WHERE staff_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) return res.send(result);
    if (err) return console.error(err);
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
    if (!err) return res.send(result);
    if (err)
      return res.send(
        "Unable to retrieve all credit at the moment" + err.message
      );
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
    [date.staffID, date.from, date.to],
    (err, result): unknown => {
      if (!err) return res.send(result);
      if (err)
        return res.send(
          "Unable to retrieve all credit at the moment" + err.message
        );
    }
  );
};

export const deleteCredit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `DELETE FROM credits WHERE credit_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) return res.send("Credit was successfully deleted");
    if (err) return console.log("Could not delete credit" + err.message);
  });
};
