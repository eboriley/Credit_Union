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
    if (!err) return res.json("Montly dues deleted successfully");
    if (err) return res.json(err);
  });
};

export const getTransactionByDateAndId = async (
  req: Request,
  res: Response
): Promise<void> => {
  let dateInfo: any = req.body;
  const sql: string = `SELECT members.staff_id, members.f_name, members.surname, members.other_name, members.institution, members.phone_1,members.phone_2, members.photo, CONCAT(transactions.month,', ',transactions.year) as period, transactions.date, transactions.description,
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
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) {
      console.log(dateInfo);
      const currentDate = (somedate: any) => {
        const date = new Date(somedate);
        return date;
      };
      const minDate = (somedate: any) => {
        const date = new Date(somedate);
        return date;
      };
      const maxDate = (somedate: any) => {
        const date = new Date(somedate);
        return date;
      };
      const returnedStatement = [];

      for (let i = 0; i < result.length; i++) {
        if (
          currentDate(result[i].date) >= minDate(dateInfo.from) &&
          currentDate(result[i].date) <= maxDate(dateInfo.to)
        ) {
          returnedStatement.push(result[i]);
        }
      }

      const ddd = returnedStatement[0];
      //dateBeforeMindate is the first object in returnedStatement
      //we need the first object in returnedStaement in order to get the date
      //of the object before it in the main array, which is results array

      const dateBeforeMinDate = result.findIndex((obj: any) => {
        return obj.date === ddd.date;
      });

      //this is how we get the object before the first object in the result array
      if (result[dateBeforeMinDate - 1]) {
        returnedStatement.push(result[dateBeforeMinDate - 1]);
      } else {
        returnedStatement.push({ balance: 0 });
      }

      const dates = {
        from: dateInfo.from,
        to: dateInfo.to,
      };

      returnedStatement.push(dates);
      let credit: number = 0;
      let debit: number = 0;
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
    if (err) return res.json(err);
  });
};
