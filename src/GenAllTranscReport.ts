const PDFGenerator = require("pdfkit");
const fs = require("fs");

class GenAllTranscReport {
  report: any;
  myDoc: any;
  constructor(report: any, myDoc: any) {
    this.report = report;
    this.myDoc = myDoc;
  }

  pageNumber = 1;

  incPage() {
    return this.pageNumber++;
  }

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
      .fontSize(12)
      .font("Calibri")
      .text(
        `All transactions from ${this.report[this.report.length - 1].from} to ${
          this.report[this.report.length - 1].to
        }`
      )
      .moveDown();

    const beginningOfPage = 10;
    const endOfPage = 600;

    doc.moveTo(beginningOfPage, 85).lineTo(endOfPage, 85).stroke();
  }

  generateTable(doc: any) {
    let tableTop = 106;
    const transDateX = 15;
    const nameX = 90;
    const institutionX = 200;
    const periodX = 320;
    const descriptionX = 420;
    const amountX = 550;

    const beginningOfPage = 10;
    const endOfPage = 600;

    doc
      .moveTo(beginningOfPage, 110)
      .lineTo(endOfPage, 110)
      .lineWidth(15)
      .strokeOpacity(1)
      .stroke("green");

    doc
      .fontSize(10)
      .fillColor("white")
      .text("TRANSC. DATE", transDateX, tableTop, { bold: true })
      .text("NAME", nameX, tableTop)
      .text("INSTITUTION", institutionX, tableTop)
      .text("PERIOD", periodX, tableTop)
      .text("DESCRIPTION", descriptionX, tableTop)
      .text("AMOUNT", amountX, tableTop)
      .fillColor("black")
      .fontSize(10);

    doc
      .fontSize(12)
      .text(`Page ${this.incPage()}`, 50, 700, { align: "right" });

    const items = this.report;
    let i = 0;
    let positionY = tableTop;

    for (i = 0; i < items.length - 1; i++) {
      const item = items[i];
      positionY += 25;
      if (positionY % 706 === 0 || positionY > 681) {
        tableTop = 25;
        positionY = 50;
        doc.addPage();
        doc
          .fontSize(12)
          .text(`Page ${this.incPage()}`, 50, 700, { align: "right" });
        doc
          .fontSize(10)
          .fillColor("white")
          .text("TRANSC. DATE", transDateX, tableTop, { bold: true })
          .text("NAME", nameX, tableTop)
          .text("INSTITUTION", institutionX, tableTop)
          .text("PERIOD", periodX, tableTop)
          .text("DESCRIPTION", descriptionX, tableTop)
          .text("AMOUNT", amountX, tableTop)
          .fillColor("black")
          .fontSize(10);
      }
      const beginningOfPage = 10;
      const endOfPage = 600;

      const truncateStr = (str: string) => {
        const someStr = str.toString();
        const length = 15;
        const truncated = someStr.substring(4, length);
        return truncated;
      };

      doc
        .fontSize(10)
        .fillColor("black")
        .text(`${truncateStr(item.date)}`, transDateX, positionY)
        .text(item.name, nameX, positionY)
        .text(item.institution, institutionX, positionY)
        .text(`${item.period}`, periodX, positionY)
        .text(`${item.description}`, descriptionX, positionY)
        .text(`${this.formatMoney(item.amount)}`, amountX, positionY);

      doc
        .moveTo(beginningOfPage, positionY + 4)
        .lineTo(endOfPage, positionY + 4)
        .lineWidth(15)
        .strokeOpacity(0.2)
        .stroke("green");
    }
  }

  generateFooter(doc: any) {
    doc.fontSize(12).text(`gof and eboriley`, 50, 700, {
      align: "center",
    });
  }

  generate() {
    this.generateHeaders(this.myDoc);

    this.myDoc.moveDown();

    this.generateTable(this.myDoc);

    this.generateFooter(this.myDoc);
  }
}

module.exports = GenAllTranscReport;
