import fs from 'fs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistration = (req, res, next) => {
  const { name = '', email = '', password = '' } = req.body;
  const errors = [];
  if (name.trim().length < 2) errors.push('Name must contain at least 2 characters.');
  if (!emailPattern.test(email)) errors.push('Enter a valid email address.');
  if (password.length < 6) errors.push('Password must contain at least 6 characters.');
  if (errors.length) return res.status(400).render('auth/register', { errors, values: { name, email } });
  next();
};

export const validateLogin = (req, res, next) => {
  const { email = '', password = '' } = req.body;
  const errors = [];
  if (!emailPattern.test(email)) errors.push('Enter a valid email address.');
  if (!password) errors.push('Password is required.');
  if (errors.length) return res.status(400).render('auth/login', { errors, values: { email } });
  next();
};

export const validateJob = (req, res, next) => {
  const fields = req.body;
  const errors = [];
  const required = {
    job_category: 'Job category', job_designation: 'Job designation',
    company_name: 'Company name', job_location: 'Job location', salary: 'Salary',
    apply_by: 'Apply-by date', skills_required: 'Required skills',
    number_of_openings: 'Number of openings', description: 'Description',
  };
  Object.entries(required).forEach(([key, label]) => {
    if (!String(fields[key] || '').trim()) errors.push(`${label} is required.`);
  });
  if (fields.number_of_openings && Number(fields.number_of_openings) < 1) errors.push('Number of openings must be at least 1.');
  if (fields.apply_by && new Date(fields.apply_by) < new Date(new Date().toDateString())) errors.push('Apply-by date cannot be in the past.');
  if (errors.length) {
    const view = req.params.id ? 'jobs/edit' : 'jobs/new';
    return res.status(400).render(view, { errors, job: { ...fields, id: req.params.id } });
  }
  next();
};

export const validateApplicant = (req, res, next) => {
  const { name = '', email = '', contact = '' } = req.body;
  const errors = [];
  if (name.trim().length < 2) errors.push('Name must contain at least 2 characters.');
  if (!emailPattern.test(email)) errors.push('Enter a valid email address.');
  if (!/^\+?[0-9\s-]{7,15}$/.test(contact)) errors.push('Enter a valid contact number.');
  if (!req.file) errors.push('A PDF, DOC, or DOCX resume is required.');
  if (errors.length) {
    if (req.file?.path) fs.unlink(req.file.path, () => {});
    return res.status(400).render('jobs/detail', {
      job: res.locals.job,
      applicationErrors: errors,
      applicationValues: { name, email, contact },
    });
  }
  next();
};
