import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";
const PDFGenerator = require("pdfkit");
const ReportGenerator = require("../ReportGenerator");
const GenerateStatement = require("../GenerateStatement");
const GenAllTranscReport = require("../GenAllTranscReport");
const GenSingleTranscReport = require("../GenSingleTranscReport");

const data = [
  {
    staff_id: "134577",
    f_name: "Matt",
    surname: "Hummels",
    other_name: null,
    institution: "islamic basic",
    phone_1: "1 902232092",
    phone_2: null,
    photo: "https://eborileys3.s3.amazonaws.com/creditunion/Rachel-Riley.jpg",
    period: "August, 2021",
    date: "2021-08-24T00:00:00.000Z",
    description: "Monthly dues",
    credit: "400.00",
    debit: "-",
    balance: 1600,
  },
  {
    staff_id: "134577",
    f_name: "Matt",
    surname: "Hummels",
    other_name: null,
    institution: "islamic basic",
    phone_1: "1 902232092",
    phone_2: null,
    photo: "https://eborileys3.s3.amazonaws.com/creditunion/Rachel-Riley.jpg",
    period: "September, 2021",
    date: "2021-09-17T00:00:00.000Z",
    description: "Monthly dues",
    credit: "400.00",
    debit: "-",
    balance: 2000,
  },
  {
    staff_id: "134577",
    f_name: "Matt",
    surname: "Hummels",
    other_name: null,
    institution: "islamic basic",
    phone_1: "1 902232092",
    phone_2: null,
    photo: "https://eborileys3.s3.amazonaws.com/creditunion/Rachel-Riley.jpg",
    period: "October, 2021",
    date: "2021-10-18T00:00:00.000Z",
    description: "Monthly dues",
    credit: "400.00",
    debit: "-",
    balance: 2400,
  },
  {
    staff_id: "134577",
    f_name: "Matt",
    surname: "Hummels",
    other_name: null,
    institution: "islamic basic",
    phone_1: "1 902232092",
    phone_2: null,
    photo: "https://eborileys3.s3.amazonaws.com/creditunion/Rachel-Riley.jpg",
    period: "November, 2021",
    date: "2021-11-28T00:00:00.000Z",
    description: "Monthly dues",
    credit: "400.00",
    debit: "-",
    balance: 2800,
  },
  {
    staff_id: "134577",
    f_name: "Matt",
    surname: "Hummels",
    other_name: null,
    institution: "islamic basic",
    phone_1: "1 902232092",
    phone_2: null,
    photo: "https://eborileys3.s3.amazonaws.com/creditunion/Rachel-Riley.jpg",
    period: "December, 2021",
    date: "2021-12-20T00:00:00.000Z",
    description: "Monthly dues",
    credit: "400.00",
    debit: "-",
    balance: 3200,
  },
  {
    staff_id: "134577",
    f_name: "Matt",
    surname: "Hummels",
    other_name: null,
    institution: "islamic basic",
    phone_1: "1 902232092",
    phone_2: null,
    photo: "https://eborileys3.s3.amazonaws.com/creditunion/Rachel-Riley.jpg",
    period: "December, 2021",
    date: "2021-12-30T00:00:00.000Z",
    description: "Interest Capitalisation",
    credit: "40.00",
    debit: "-",
    balance: 3240,
  },
  {
    staff_id: "134577",
    f_name: "Matt",
    surname: "Hummels",
    other_name: null,
    institution: "islamic basic",
    phone_1: "1 902232092",
    phone_2: null,
    photo: "https://eborileys3.s3.amazonaws.com/creditunion/Rachel-Riley.jpg",
    period: "July, 2021",
    date: "2021-07-14T00:00:00.000Z",
    description: "Monthly dues",
    credit: "400.00",
    debit: "-",
    balance: 1200,
  },
  {
    from: "2021-08-01",
    to: "2022-01-01",
  },
  {
    credit: 2040,
    debit: 0,
  },
];

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

// type DateInfo = {
//   from: string;
//   to: string;
//   staff_id: string;
// };

interface DateInfo {
  from: string;
  to: string;
  staff_id: string;
}

export const getReportByDateAndId = async (
  req: Request,
  res: Response
): Promise<void> => {
  let dateInfo = req.query;
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
SUM(transactions.credit - transactions.debit) OVER (ORDER BY transaction_id) as balance from transactions INNER JOIN members ON 
transactions.staff_id = members.staff_id
WHERE transactions.staff_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) {
      try {
        if (result.length > 0) {
          console.log(dateInfo);
          const currentDate = (somedate: string) => {
            const date = new Date(somedate);
            return date;
          };
          const minDate = (somedate: string) => {
            const date = new Date(somedate);
            return date;
          };
          const maxDate = (somedate: string) => {
            const date = new Date(somedate);
            return date;
          };
          const returnedStatement = [];

          for (let i = 0; i < result.length; i++) {
            const from = minDate(`${dateInfo.from}`);
            const to = maxDate(`${dateInfo.to}`);

            if (
              currentDate(result[i].date) >= from &&
              currentDate(result[i].date) <= to
            ) {
              returnedStatement.push(result[i]);
            }

            // if (from.getMonth() === to.getMonth()) {
            //   return res.json("Records cannot be selected from the same month");
            // }
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
          const myDoc: any = new PDFGenerator({ bufferPages: true });
          const docName: string = returnedStatement[0].staff_id;
          let buffers: any = [];
          myDoc.on("data", buffers.push.bind(buffers));
          myDoc.on("end", () => {
            let pdfData = Buffer.concat(buffers);
            res
              .writeHead(200, {
                "Content-Length": Buffer.byteLength(pdfData),
                "Content-Type": "application/pdf",
                "Content-disposition":
                  "attachment;filename=statement_" + docName + ".pdf",
              })
              .end(pdfData);
          });
          const gs = new GenerateStatement(returnedStatement, myDoc);
          gs.generate();

          myDoc.end();
        } else res.json("no records");
      } catch (error) {
        if (error instanceof TypeError) {
          return res.json("No records found between selected dates");
        }
        console.error(error);
      }
    }
    if (err) return res.json(err);
  });
};

export const demoReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  const myDoc: any = new PDFGenerator({ bufferPages: true });

  let buffers: any = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=test.pdf",
      })
      .end(pdfData);
  });
  const gs = new GenerateStatement(data, myDoc);
  gs.generate();

  myDoc.end();
};

export const getAllTransactionsByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  let dateInfo: any = req.query;
  const sql: string = `SELECT members.staff_id, CONCAT(members.f_name,' ',members.surname) as name, members.institution, members.phone_1,members.phone_2, members.photo, CONCAT(transactions.month,', ',transactions.year) as period, transactions.date, (transactions.credit + transactions.debit) as amount, transactions.description from transactions 
  INNER JOIN members 
  ON transactions.staff_id = members.staff_id 
  WHERE date BETWEEN ? AND ?`;
  mysqlConnection.query(
    sql,
    [dateInfo.from, dateInfo.to],
    (err, result): unknown => {
      if (!err) {
        try {
          if (result.length > 0) {
            const report = result;
            const dates = {
              from: dateInfo.from,
              to: dateInfo.to,
            };

            report.push(dates);
            console.log(report);
            const myDoc: any = new PDFGenerator({ bufferPages: true });
            const docName: string = result[0].staff_id;
            let buffers: any = [];
            myDoc.on("data", buffers.push.bind(buffers));
            myDoc.on("end", () => {
              let pdfData = Buffer.concat(buffers);
              res
                .writeHead(200, {
                  "Content-Length": Buffer.byteLength(pdfData),
                  "Content-Type": "application/pdf",
                  "Content-disposition":
                    "attachment;filename=statement_" + docName + ".pdf",
                })
                .end(pdfData);
            });
            const gs = new GenAllTranscReport(result, myDoc);
            gs.generate();

            myDoc.end();
          } else res.json("no records");
        } catch (error) {
          if (error instanceof TypeError) {
            return res.json("No records found between selected dates");
          }
          console.error(error);
        }
      }
      if (err) {
        return res.json(err);
      }
    }
  );
};

export const getAllSingleTransactionByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  let dateInfo: any = req.query;
  const sql: string = `SELECT members.staff_id, CONCAT(members.f_name,' ',members.surname) as name, members.institution, members.phone_1,members.phone_2, members.photo, CONCAT(transactions.month,', ',transactions.year) as period, transactions.date, (transactions.credit + transactions.debit) as amount, transactions.description from transactions 
  INNER JOIN members 
  ON transactions.staff_id = members.staff_id 
  WHERE date BETWEEN ? AND ? AND members.staff_id = ?`;
  mysqlConnection.query(
    sql,
    [dateInfo.from, dateInfo.to, dateInfo.staff_id],
    (err, result): unknown => {
      if (!err) {
        try {
          if (result.length > 0) {
            const report = result;
            const dates = {
              from: dateInfo.from,
              to: dateInfo.to,
            };

            report.push(dates);
            console.log(report);
            const myDoc: any = new PDFGenerator({ bufferPages: true });
            const docName: string = result[0].staff_id;
            let buffers: any = [];
            myDoc.on("data", buffers.push.bind(buffers));
            myDoc.on("end", () => {
              let pdfData = Buffer.concat(buffers);
              res
                .writeHead(200, {
                  "Content-Length": Buffer.byteLength(pdfData),
                  "Content-Type": "application/pdf",
                  "Content-disposition":
                    "attachment;filename=statement_" + docName + ".pdf",
                })
                .end(pdfData);
            });
            const gs = new GenSingleTranscReport(result, myDoc);
            gs.generate();

            myDoc.end();
          } else res.json("no records");
        } catch (error) {
          if (error instanceof TypeError)
            return res.json("No records found between selected dates");
          console.error(error);
        }
      }
      if (err) {
        return res.json(err);
      }
    }
  );
};
