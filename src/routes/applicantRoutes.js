import { Router } from 'express';
import { applyToJob, downloadResume } from '../controllers/Applicant.controller.js';
import { loadJob } from '../controllers/Job.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { sendApplicationConfirmation } from '../middlewares/email.js';
import { uploadResume } from '../middlewares/multer.js';
import { validateApplicant } from '../middlewares/validation.js';

const router = Router();
router.post('/jobs/:id/apply', loadJob, uploadResume, validateApplicant, sendApplicationConfirmation, applyToJob);
router.get('/jobs/:id/applicants/:applicantId/resume', requireAuth, downloadResume);

export default router;
