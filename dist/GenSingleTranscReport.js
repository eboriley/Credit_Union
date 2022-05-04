"use strict";
class GenSingleTranscReport {
    constructor(report, myDoc) {
        this.pageNumber = 1;
        this.report = report;
        this.myDoc = myDoc;
    }
    incPage() {
        return this.pageNumber++;
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
            .fontSize(12)
            .font("Calibri")
            .text(`All transactions from ${this.report[this.report.length - 1].from} to ${this.report[this.report.length - 1].to}`)
            .text(`Name: ${this.report[0].name}   ||  Staff ID: ${this.report[0].staff_id}`)
            .text(`Institution: ${this.report[0].institution}`)
            .moveDown();
        const beginningOfPage = 50;
        const endOfPage = 550;
        doc.moveTo(beginningOfPage, 95).lineTo(endOfPage, 95).stroke();
    }
    generateTable(doc) {
        let tableTop = 106;
        const transDateX = 60;
        const nameX = 90;
        const institutionX = 200;
        const periodX = 150;
        const descriptionX = 250;
        const amountX = 420;
        const beginningOfPage = 50;
        const endOfPage = 550;
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
            //   .text("NAME", nameX, tableTop)
            //   .text("INSTITUTION", institutionX, tableTop)
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
                    //   .text("NAME", nameX, tableTop)
                    //   .text("INSTITUTION", institutionX, tableTop)
                    .text("PERIOD", periodX, tableTop)
                    .text("DESCRIPTION", descriptionX, tableTop)
                    .text("AMOUNT", amountX, tableTop)
                    .fillColor("black")
                    .fontSize(10);
            }
            const beginningOfPage = 50;
            const endOfPage = 550;
            const truncateStr = (str) => {
                const someStr = str.toString();
                const length = 15;
                const truncated = someStr.substring(4, length);
                return truncated;
            };
            doc
                .fontSize(10)
                .fillColor("black")
                .text(`${truncateStr(item.date)}`, transDateX, positionY)
                // .text(item.name, nameX, positionY)
                // .text(item.institution, institutionX, positionY)
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
    generateFooter(doc) {
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
module.exports = GenSingleTranscReport;
