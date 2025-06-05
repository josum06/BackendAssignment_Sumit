import express from 'express';
const router = express.Router();


import adminAuth from '../middlewares/adminAuth.js';
import { getChapters, getChapterById , uploadChapters } from '../controllers/chapterController.js';

// Route to get all chapters
router.get('/', getChapters); // for getting all chapters
router.get('/:id', getChapterById); // getting chapter by ID
router.post('/', adminAuth , uploadChapters); // for uploading


export default router;




