"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pages_1 = require("../controllers/pages");
const members_1 = require("../controllers/members");
const credits_1 = require("../controllers/credits");
const router = express_1.default.Router();
router.get("/things", pages_1.things);
router.get("/members", members_1.viewMembers);
router.get("/archived-members", members_1.viewArchivedMembers);
router.post("/add-member", members_1.addMember);
router.put("/update-member/:id", members_1.updateMember);
router.put("/remove-member/:id", members_1.removeMember);
//credit routes
router.get("/credits", credits_1.getAllCredits);
router.get("/credits-by-one-member/:id", credits_1.getCreditsByOneMember);
router.delete("/delete-credit/:id", credits_1.deleteCredit);
router.post("/add-credit", credits_1.addCredit);
exports.default = router;
