import * as JobModel from '../model/Job.js';

const ownsJob = (job, user) => job && user && job.recruiterId === user.id;

export const getAllJobs = (_req, res) =>
  res.render('jobs/list', { jobs: JobModel.getAllJobs() });

export const getJobById = (req, res) => {
  const job = JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).render('errors/404');
  return res.render('jobs/detail', {
    job,
    applicationErrors: [],
    applicationValues: {},
  });
};

export const loadJob = (req, res, next) => {
  const job = JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).render('errors/404');
  res.locals.job = job;
  next();
};

export const requireJobOwner = (req, res, next) => {
  const job = res.locals.job || JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).render('errors/404');
  if (!ownsJob(job, req.session.user)) return res.status(403).render('errors/403');
  res.locals.job = job;
  next();
};

export const showCreateJob = (_req, res) =>
  res.render('jobs/new', { errors: [], job: {} });

export const createJob = (req, res) => {
  const job = JobModel.addJob({
    ...req.body,
    number_of_openings: Number(req.body.number_of_openings),
    recruiterId: req.session.user.id,
  });
  req.session.message = 'Job posted successfully.';
  return res.redirect(`/jobs/${job.id}`);
};

export const showUpdateJob = (req, res) => {
  const job = JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).render('errors/404');
  if (!ownsJob(job, req.session.user)) return res.status(403).render('errors/403');
  return res.render('jobs/edit', { job, errors: [] });
};

export const updateJob = (req, res) => {
  const job = JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).render('errors/404');
  if (!ownsJob(job, req.session.user)) return res.status(403).render('errors/403');
  JobModel.updateJob(job.id, {
    ...req.body,
    number_of_openings: Number(req.body.number_of_openings),
  });
  req.session.message = 'Job updated successfully.';
  return res.redirect(`/jobs/${job.id}`);
};

export const deleteJob = (req, res) => {
  const job = JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).render('errors/404');
  if (!ownsJob(job, req.session.user)) return res.status(403).render('errors/403');
  JobModel.deleteJob(job.id);
  req.session.message = 'Job deleted.';
  return res.redirect('/jobs');
};

export const getJobApplicants = (req, res) => {
  const job = JobModel.getJobById(req.params.id);
  if (!job) return res.status(404).render('errors/404');
  if (!ownsJob(job, req.session.user)) return res.status(403).render('errors/403');
  return res.render('applicants/list', {
    job,
    applicants: JobModel.getAllApplicants(job.id),
  });
};
