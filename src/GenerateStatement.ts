import { table } from "console";

const PDFGenerator = require("pdfkit");
const fs = require("fs");

class ReportGenerator {
  statements: any;
  myDoc: any;
  constructor(statements: any, myDoc: any) {
    this.statements = statements;
    this.myDoc = myDoc;
  }

  date = new Date();
  months = [
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
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  month = this.date.getMonth();
  day = this.date.getDay();
  dayDate = this.date.getDate();
  year = this.date.getFullYear();

  formatMoney(money: any) {
    const num = money;
    return num.toLocaleString("en-GH", {
      style: "currency",
      currency: "GHS",
    });
  }

  generateHeaders(doc: any) {
    const cedi = "GH₵";
    doc.registerFont(
      "Calibri",
      __dirname + "/fonts/Calibri/calibri-regular.ttf"
    );
    doc.registerFont(
      "Calibri-Bold",
      __dirname + "/fonts/Calibri/calibri-bold.ttf"
    );
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
      .text(
        `Full Name: ${this.statements[0].f_name} ${
          this.statements[0].surname
        } ${
          this.statements[0].other_name ? this.statements[0].other_name : ""
        }`,
        { align: "left" }
      )
      .text(`Institution: ${this.statements[0].institution}`, { align: "left" })
      .text(
        `Phone: ${this.statements[0].phone_1}, ${
          this.statements[0].phone_2 ? this.statements[0].phone_2 : ""
        }`,
        { align: "left" }
      )
      .fontSize(10)
      .text(
        `Statement Date: ${this.months[this.month]} ${this.dayDate} ${
          this.year
        }, ${this.days[this.day]}`,
        0,
        90,
        { align: "right" }
      )
      .text(
        `Period: ${this.statements[this.statements.length - 2].from} to ${
          this.statements[this.statements.length - 2].to
        }`,
        { align: "right" }
      )
      .text(
        `Opening Balance:  ${this.formatMoney(
          this.statements[this.statements.length - 3].balance
        )}`,
        { align: "right" }
      )
      .text(
        `Total Credit: ${this.formatMoney(
          this.statements[this.statements.length - 1].credit
        )}`,
        { align: "right" }
      )
      .text(
        `Total Debit: ${this.formatMoney(
          this.statements[this.statements.length - 1].debit
        )}`,
        { align: "right" }
      )
      .text(
        `Closing Balance: ${this.formatMoney(
          this.statements[this.statements.length - 4].balance
        )}`,
        { align: "right" }
      )

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

  generateTable(doc: any) {
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
      .text(
        `Opening Balance: ${this.formatMoney(
          this.statements[this.statements.length - 3].balance
        )}`,
        debitX,
        tableTop + 12
      );

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

      const truncateStr = (str: string): string => {
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

  generateFooter(doc: any) {
    doc.fontSize(12).text(`Payment due upon receipt. `, 50, 700, {
      align: "center",
    });
  }

  generate() {
    // let theOutput = new PDFGenerator();

    this.generateHeaders(this.myDoc);

    this.myDoc.moveDown();

    this.generateTable(this.myDoc);

    this.generateFooter(this.myDoc);
  }
}

module.exports = ReportGenerator;
