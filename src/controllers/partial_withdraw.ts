import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";

type Withdrawal = {
  withdrawalID: string;
  amount: number;
  date: unknown;
  staffID: string;
};

export const getAllWithdrawals = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM partial_withdrawals`;
  mysqlConnection.query(sql, (err, result) => {
    if (!err) return res.send(result);
    if (err)
      return res.send("Could not retrieve partial withdrawals" + err.message);
  });
};
