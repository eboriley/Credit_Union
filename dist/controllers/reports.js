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
const PDFGenerator = require("pdfkit");
const ReportGenerator = require("../ReportGenerator");
const GenerateStatement = require("../GenerateStatement");
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
exports.getReportByDateAndId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dateInfo = req.query;
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
SUM(transactions.credit - transactions.debit) OVER (ORDER BY transaction_id) as balance from transactions INNER JOIN members ON 
transactions.staff_id = members.staff_id
WHERE transactions.staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err) {
            if (result.length > 0) {
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
                const myDoc = new PDFGenerator({ bufferPages: true });
                const docName = returnedStatement[0].staff_id;
                let buffers = [];
                myDoc.on("data", buffers.push.bind(buffers));
                myDoc.on("end", () => {
                    let pdfData = Buffer.concat(buffers);
                    res
                        .writeHead(200, {
                        "Content-Length": Buffer.byteLength(pdfData),
                        "Content-Type": "application/pdf",
                        "Content-disposition": "attachment;filename=statement_" + docName + ".pdf",
                    })
                        .end(pdfData);
                });
                const gs = new GenerateStatement(returnedStatement, myDoc);
                gs.generate();
                myDoc.end();
            }
            else
                res.json("no records");
        }
        if (err)
            return res.json(err);
    });
});
exports.demoReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myDoc = new PDFGenerator({ bufferPages: true });
    let buffers = [];
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
});
exports.getReportByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dateInfo = req.query;
    const sql = `SELECT members.staff_id, CONCAT(members.f_name,' ',members.surname) as name, members.institution, members.phone_1,members.phone_2, members.photo, CONCAT(transactions.month,', ',transactions.year) as period, transactions.date, (transactions.credit + transactions.debit) as amount, transactions.description from transactions 
INNER JOIN members 
ON transactions.staff_id = members.staff_id 
WHERE date BETWEEN ? AND ?`;
    mysqlConn_1.mysqlConnection.query(sql, [dateInfo.from, dateInfo.to], (err, result) => {
        if (!err) {
            return res.json(result);
        }
        if (err) {
            return res.json(err);
        }
    });
});
