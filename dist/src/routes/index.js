"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PDFGenerator = require("pdfkit");
const pages_1 = require("../controllers/pages");
const members_1 = require("../controllers/members");
const credits_1 = require("../controllers/credits");
const loan_deduc_1 = require("../controllers/loan_deduc");
const transactions_1 = require("../controllers/transactions");
const partial_withdraw_1 = require("../controllers/partial_withdraw");
const reports_1 = require("../controllers/reports");
const router = express_1.default.Router();
router.get("/things", pages_1.things);
router.get("/members", members_1.viewMembers);
router.get("/members/:term", members_1.viewMembersByTerm);
router.get("/archived-members", members_1.viewArchivedMembers);
router.get("/members/:id", members_1.viewMemberById);
router.get("/editmember/:id", members_1.viewMemberById);
router.post("/add-member", members_1.addMember);
router.put("/update-member/:id", members_1.updateMember);
router.put("/archive-member/:id", members_1.archiveMember);
router.delete("/remove-member/:id", members_1.removeMember);
//credit routes
router.get("/credits", credits_1.getAllCredits);
router.get("/credits-by-one-member/:id", credits_1.getCreditsByOneMember);
router.get("/credits-bydate", credits_1.getAllCreditsByDate);
router.get("/credits-bydatenid", credits_1.getAllCreditsByDateAndId);
router.delete("/delete-credit/:id", credits_1.deleteCredit);
router.post("/add-credit", credits_1.addCredit);
//loan deduction
router.get("/loan-deduc", loan_deduc_1.getAllDeductions);
router.get("/loan-loanid", loan_deduc_1.getDeductionsByLoanId);
router.get("/loan-deduc-bydate", loan_deduc_1.getAllDeductionsByDate);
router.get("/loan-deduc-bydatenid", loan_deduc_1.getAllDeductionsByDateAndId);
router.post("/add-loan-deduction", loan_deduc_1.addDeduction);
router.put("/edit-deduction/:id", loan_deduc_1.editDeduction);
router.delete("/delete-deduction/:id", loan_deduc_1.deleteDeduction);
// partial withdrawal routes
router.get("/partial-withdraw", partial_withdraw_1.getAllWithdrawals);
// transactions routes
router.post("/add-monthlydues", transactions_1.addMonthlyDues);
router.get("/get-monthlydues", transactions_1.getAllMonthlyDues);
router.get("/get-monthlydues-id/:id", transactions_1.getAllMonthlyDuesByMemberID);
router.delete("/remove-monthlydues/:id", transactions_1.removeMonthlyDues);
router.get("/transactionbydate/:id", transactions_1.getTransactionByDateAndId);
// page renders
router.get("/somepage", (req, res) => {
    res.render("pages/index");
});
router.get("/report/download/:id", (req, res) => {
    let id = req.params.id;
    const filePath = `${__dirname}/${id}.pdf`;
    const fileName = "invoice 1234.pdf";
    res.download(filePath, fileName);
});
router.get("/demo-report", reports_1.demoReport);
router.get("/reportbydate/:id", reports_1.getReportByDateAndId);
exports.default = router;
