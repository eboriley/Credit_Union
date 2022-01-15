import express from 'express'
import { things } from "../controllers/pages"
import { addMember } from '../controllers/members';


const router = express.Router();

router.get('/things', things);

router.post('/members', addMember)

export default router;