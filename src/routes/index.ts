import express from 'express'
const PDFGenerator = require("pdfkit");
import { things } from "../controllers/pages";
import {
  addMember,
  viewMemberById,
  viewMembers,
  viewAllMembers,
  updateMember,
  updateMemberPassword,
  removeMember,
  archiveMember,
  viewArchivedMembers,
  viewMembersByTerm,
  login,
} from "../controllers/members";

import {
  getAllCredits,
  getCreditsByOneMember,
  deleteCredit,
  addCredit,
  getAllCreditsByDate,
  getAllCreditsByDateAndId,
} from "../controllers/credits";

import {
  addDeduction,
  editDeduction,
  getAllDeductions,
  getDeductionsByLoanId,
  getAllDeductionsByDate,
  getAllDeductionsByDateAndId,
  deleteDeduction,
} from "../controllers/loan_deduc";

import {
  addMonthlyDues,
  getAllMonthlyDues,
  getAllMonthlyDuesByMemberID,
  removeMonthlyDues,
  getAllTransactionsById,
  getAllTransactionsQuery,
  getAllTransactions,
  getAllTransactionsByMemberId,
  getRecentlyAddedTransactions
} from "../controllers/transactions";

import { getAllWithdrawals } from "../controllers/partial_withdraw";

import {
  demoReport,
  getReportByDateAndId,
  getAllTransactionsByDate,
  getAllSingleTransactionByDate,
} from "../controllers/reports";

const router = express.Router();

router.get("/things", things);

router.get("/members", viewMembers);

router.get("/allmembers", viewAllMembers);

router.get("/members/:term", viewMembersByTerm);

router.get("/archived-members", viewArchivedMembers);

router.get("/member/:id", viewMemberById);

router.get("/editmember/:id", viewMemberById);

router.post("/add-member", addMember);

router.post("/login", login);

router.put("/update-member/:id", updateMember);

router.put("/update-member-pass/:id", updateMemberPassword)

router.put("/archive-member/:id", archiveMember);

router.delete("/remove-member/:id", removeMember);

//credit routes

router.get("/credits", getAllCredits);

router.get("/credits-by-one-member/:id", getCreditsByOneMember);

router.get("/credits-bydate", getAllCreditsByDate);

router.get("/credits-bydatenid", getAllCreditsByDateAndId);

router.delete("/delete-credit/:id", deleteCredit);

router.post("/add-credit", addCredit);

//loan deduction
router.get("/loan-deduc", getAllDeductions);

router.get("/loan-loanid", getDeductionsByLoanId);

router.get("/loan-deduc-bydate", getAllDeductionsByDate);

router.get("/loan-deduc-bydatenid", getAllDeductionsByDateAndId);

router.post("/add-loan-deduction", addDeduction);

router.put("/edit-deduction/:id", editDeduction);

router.delete("/delete-deduction/:id", deleteDeduction);

// partial withdrawal routes

router.get("/partial-withdraw", getAllWithdrawals);

// transactions routes
router.get("/transactions-all",getAllTransactions)

router.post("/add-monthlydues", addMonthlyDues);

router.get("/get-monthlydues", getAllMonthlyDues);

router.get("/get-monthlydues-id/:id", getAllMonthlyDuesByMemberID);

router.delete("/remove-monthlydues/:id", removeMonthlyDues);

router.get("/transactions/:id", getAllTransactionsById);

router.get("/member-transactions/:id", getAllTransactionsByMemberId)

router.get("/transactions-api/:term", getAllTransactionsQuery)

router.get("/recent-transactions/:id",getRecentlyAddedTransactions)

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

router.get("/demo-report", demoReport);

router.get("/reportbydate/:id", getReportByDateAndId);

router.get("/alltransac", getAllTransactionsByDate);

router.get("/singletransac", getAllSingleTransactionByDate);

export default router;


