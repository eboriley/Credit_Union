import express from 'express'
import { things } from "../controllers/pages"
import {
  addMember,
  viewMembers,
  updateMember,
  removeMember,
  viewArchivedMembers,
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

const router = express.Router();

router.get("/things", things);

router.get("/members", viewMembers);

router.get("/archived-members", viewArchivedMembers);

router.post("/add-member", addMember);

router.put("/update-member/:id", updateMember);

router.put("/remove-member/:id", removeMember);

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

export default router;