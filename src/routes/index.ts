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
} from "../controllers/credits";

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

router.delete("/delete-credit/:id", deleteCredit);

router.post("/add-credit", addCredit);


export default router;