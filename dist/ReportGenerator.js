"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PDFGenerator = require("pdfkit");
const fs = require("fs");
class ReportGenerator {
    constructor(statements) {
        this.date = new Date();
        this.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        this.days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        this.month = this.date.getMonth();
        this.day = this.date.getDay();
        this.dayDate = this.date.getDate();
        this.year = this.date.getFullYear();
        this.statements = statements;
    }
    formatMoney(money) {
        const num = money;
        return num.toLocaleString("en-GH", {
            style: "currency",
            currency: "GHS",
        });
    }
    generateHeaders(doc) {
        const cedi = "GH₵";
        doc.registerFont("Calibri", __dirname + "/fonts/Calibri/calibri-regular.ttf");
        doc.registerFont("Calibri-Bold", __dirname + "/fonts/Calibri/calibri-bold.ttf");
        doc.image("./logo.jpg", 50, 20, { width: 50 }).fillColor("#000");
        doc
            .fontSize(14)
            .font("Calibri-Bold")
            .text(`NKAWKAW ISLAMIC BASIC SCHOOL TEACHER'S CREDIT UNION`, 120, 20)
            .fontSize(12)
            .font("Calibri")
            .text(`P.O. Box NK 25, Nkawkaw. Email: nibs@gmail.com`)
            .fontSize(14)
            .font("Calibri-Bold")
            .text(`MEMBER ACCOUNT STATEMENT`)
            .fontSize(10)
            .font("Calibri")
            .text(`Staff ID: ${this.statements[0].staff_id}`, 50, 90, {
            align: "left",
        })
            .text(`Full Name: ${this.statements[0].f_name} ${this.statements[0].surname} ${this.statements[0].other_name ? this.statements[0].other_name : ""}`, { align: "left" })
            .text(`Institution: ${this.statements[0].institution}`, { align: "left" })
            .text(`Phone: ${this.statements[0].phone_1}, ${this.statements[0].phone_2 ? this.statements[0].phone_2 : ""}`, { align: "left" })
            .fontSize(10)
            .text(`Statement Date: ${this.months[this.month]} ${this.dayDate} ${this.year}, ${this.days[this.day]}`, 0, 90, { align: "right" })
            .text(`Period: ${this.statements[this.statements.length - 2].from} to ${this.statements[this.statements.length - 2].to}`, { align: "right" })
            .text(`Opening Balance:  ${this.formatMoney(this.statements[this.statements.length - 3].balance)}`, { align: "right" })
            .text(`Total Credit: ${this.formatMoney(this.statements[this.statements.length - 1].credit)}`, { align: "right" })
            .text(`Total Debit: ${this.formatMoney(this.statements[this.statements.length - 1].debit)}`, { align: "right" })
            .text(`Closing Balance: ${this.formatMoney(this.statements[this.statements.length - 4].balance)}`, { align: "right" })
            .moveDown();
        // .text(
        //   `Billing Address:\n ${billingAddress.name}\n${billingAddress.address}\n${billingAddress.city}\n${billingAddress.state},${billingAddress.country}, ${billingAddress.postalCode}`,
        //   { align: "right" }
        // );
        const beginningOfPage = 50;
        const endOfPage = 550;
        doc.moveTo(beginningOfPage, 85).lineTo(endOfPage, 85).stroke();
        // doc.text(`Memo: ${this.invoice.memo || "N/A"}`, 50, 210);
        doc.moveTo(beginningOfPage, 163).lineTo(endOfPage, 163).stroke();
    }
    generateTable(doc) {
        let tableTop = 170;
        const transDateX = 55;
        const periodX = 140;
        const descriptionX = 215;
        const creditX = 320;
        const debitX = 400;
        const balanceX = 470;
        const beginningOfPage = 50;
        const endOfPage = 550;
        doc
            .moveTo(beginningOfPage, 174)
            .lineTo(endOfPage, 174)
            .lineWidth(15)
            .strokeOpacity(1)
            .stroke("green");
        doc
            .fontSize(10)
            .fillColor("white")
            .text("TRANS. DATE", transDateX, tableTop, { bold: true })
            .text("PERIOD", periodX, tableTop)
            .text("DESCRIPTION", descriptionX, tableTop)
            .text("CREDIT", creditX, tableTop)
            .text("DEBIT", debitX, tableTop)
            .text("BALANCE", balanceX, tableTop)
            .fillColor("black")
            .fontSize(10)
            .text(`Opening Balance: ${this.formatMoney(this.statements[this.statements.length - 3].balance)}`, debitX, tableTop + 12);
        const items = this.statements;
        let i = 0;
        let positionY = tableTop;
        for (i = 0; i < items.length - 3; i++) {
            const item = items[i];
            positionY += 25;
            if (positionY % 675 === 0) {
                tableTop = 25;
                positionY = 50;
                doc.addPage();
                doc
                    .fontSize(10)
                    .fillColor("white")
                    .text("TRANS. DATE", transDateX, tableTop, { bold: true })
                    .text("PERIOD", periodX, tableTop)
                    .text("DESCRIPTION", descriptionX, tableTop)
                    .text("CREDIT", creditX, tableTop)
                    .text("DEBIT", debitX, tableTop)
                    .text("BALANCE", balanceX, tableTop);
            }
            const beginningOfPage = 50;
            const endOfPage = 550;
            const truncateStr = (str) => {
                const someStr = str.toString();
                const length = 15;
                const truncated = someStr.substring(0, length);
                return truncated;
            };
            doc
                .fontSize(10)
                .fillColor("black")
                .text(`${truncateStr(item.date)}`, transDateX, positionY)
                .text(item.period, periodX, positionY)
                .text(item.description, descriptionX, positionY)
                .text(`${this.formatMoney(item.credit)}`, creditX, positionY)
                .text(`${this.formatMoney(item.debit)}`, debitX, positionY)
                .text(`${this.formatMoney(item.balance)}`, balanceX, positionY);
            doc
                .moveTo(beginningOfPage, positionY + 4)
                .lineTo(endOfPage, positionY + 4)
                .lineWidth(15)
                .strokeOpacity(0.2)
                .stroke("green");
        }
    }
    generateFooter(doc) {
        doc.fontSize(12).text(`Payment due upon receipt. `, 50, 700, {
            align: "center",
        });
    }
    generate() {
        let theOutput = new PDFGenerator();
        console.log(this.statements);
        const fileName = `${__dirname}/routes/${this.statements[0].staff_id}.pdf`;
        // pipe to a writable stream which would save the result into the same directory
        theOutput.pipe(fs.createWriteStream(fileName));
        this.generateHeaders(theOutput);
        theOutput.moveDown();
        this.generateTable(theOutput);
        this.generateFooter(theOutput);
        // write out file
        theOutput.end();
    }
}
module.exports = ReportGenerator;
