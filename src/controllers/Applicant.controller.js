import path from 'path';
import * as JobModel from '../model/Job.js';

export const applyToJob = (req, res) => {
  const job = res.locals.job;
  JobModel.addApplicant(job.id, {
    name: req.body.name.trim(),
    email: req.body.email.trim().toLowerCase(),
    contact: req.body.contact.trim(),
    resume: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
    },
  });
  req.session.message = res.locals.confirmationEmailSent
    ? 'Application submitted. A confirmation email has been sent.'
    : 'Application submitted successfully.';
  return res.redirect(`/jobs/${job.id}`);
};

export const downloadResume = (req, res) => {
  const job = JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).render('errors/404');
  if (job.recruiterId !== req.session.user.id) return res.status(403).render('errors/403');
  const applicant = JobModel.getApplicant(job.id, req.params.applicantId);
  if (!applicant?.resume) return res.status(404).render('errors/404');
  return res.download(path.resolve(applicant.resume.path), applicant.resume.originalName);
};
