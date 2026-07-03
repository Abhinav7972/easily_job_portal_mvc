import { Router } from 'express';
import {
  createJob, deleteJob, getAllJobs, getJobApplicants, getJobById,
  loadJob, requireJobOwner, showCreateJob, showUpdateJob, updateJob,
} from '../controllers/Job.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validateJob } from '../middlewares/validation.js';

const router = Router();
router.get('/', getAllJobs);
router.get('/new', requireAuth, showCreateJob);
router.post('/', requireAuth, validateJob, createJob);
router.get('/:id/edit', requireAuth, loadJob, requireJobOwner, showUpdateJob);
router.post('/:id/update', requireAuth, loadJob, requireJobOwner, validateJob, updateJob);
router.post('/:id/delete', requireAuth, loadJob, requireJobOwner, deleteJob);
router.get('/:id/applicants', requireAuth, loadJob, requireJobOwner, getJobApplicants);
router.get('/:id', getJobById);

export default router;
