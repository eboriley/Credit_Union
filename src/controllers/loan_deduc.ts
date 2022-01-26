import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";

type Deduction = {
  deduction_id?: number;
  amount: number;
  description: string;
  timestamp?: any;
  loan_id: string;
};

type DateInfo = {
  loan_id: string;
  from: string;
  to: string;
};

export const addDeduction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deduction: Deduction = req.body;
  const sql: string = `INSERT INTO loan_deductions (amount, description, timestamp, loan_id)
    VALUES (?,?,CURRENT_TIMESTAMP,?)`;
  mysqlConnection.query(
    sql,
    [deduction.amount, deduction.description, [deduction.loan_id]],
    (err, result): unknown => {
      if (!err)
        return res.send("Credit was successfully added to loan account");
      if (err)
        return res.send("Unable to credit loan to account" + err.message);
    }
  );
};

export const editDeduction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deduction: Deduction = req.body;
  const sql: string = `UPDATE loan_deductions SET amount = ?, description =?,
    timestamp = CURRENT_TIMESTAMP, loan_id = ? WHERE deduction_id = ?`;
  mysqlConnection.query(
    sql,
    [deduction.amount, deduction.description, deduction.loan_id, req.params.id],
    (err, result): unknown => {
      if (!err) return res.send("Loan credit record successfully updated!");
      if (err)
        return res.send("Unable to update loan credit record" + err.message);
    }
  );
};

export const getAllDeductions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM loan_deductions`;
  mysqlConnection.query(sql, (err, result): unknown => {
    if (!err) return res.send(result);
    if (err)
      return res.send(
        "Unable to retrieve all credit at the moment" + err.message
      );
  });
};

export const getAllDeductionsByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const date: DateInfo = req.body;
  const sql: string = `SELECT * FROM loan_deductions WHERE timestamp BETWEEN 
  ? AND ?`;
  mysqlConnection.query(sql, [date.from, date.to], (err, result): unknown => {
    if (!err) return res.send(result);
    if (err)
      return res.send(
        "Unable to retrieve all credit at the moment" + err.message
      );
  });
};

export const getAllDeductionsByDateAndId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const date: DateInfo = req.body;
  const sql: string = `SELECT * FROM loan_deductions WHERE loan_id = ? AND timestamp BETWEEN 
  ? AND ?`;
  mysqlConnection.query(
    sql,
    [date.loan_id, date.from, date.to],
    (err, result): unknown => {
      if (!err) return res.send(result);
      if (err)
        return res.send(
          "Unable to retrieve all credit at the moment" + err.message
        );
    }
  );
};

export const deleteDeduction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `DELETE FROM loan_deductions WHERE deduction_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) return res.send("Deduction record deleted successfully!");
    if (err) return res.send("Unable to delete record" + err.message);
  });
};

export const getDeductionsByLoanId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM loan_deductions where loan_id = ?`;
  const deduction: Deduction = req.body;
  mysqlConnection.query(sql, [deduction.loan_id], (err, result): unknown => {
    if (!err) return res.send(result);
    if (err)
      return res.send(
        "Unable to retrieve all credit at the moment" + err.message
      );
  });
};
