"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pages_1 = require("../controllers/pages");
const members_1 = require("../controllers/members");
const router = express_1.default.Router();
router.get('/things', pages_1.things);
router.post('/members', members_1.addMember);
exports.default = router;
