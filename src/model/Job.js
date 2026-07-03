import crypto from 'crypto';

let jobs = [
  {
    id: crypto.randomUUID(),
    job_category: 'Tech',
    job_designation: 'Frontend Developer',
    company_name: 'Easily Labs',
    job_location: 'Bengaluru',
    salary: '8-12 LPA',
    apply_by: '2026-12-31',
    skills_required: 'JavaScript, HTML, CSS, React',
    number_of_openings: 2,
    description: 'Build accessible, responsive web experiences with our product team.',
    recruiterId: null,
    applicants: [],
    createdAt: new Date().toISOString(),
  },
];

export const addJob = (jobData) => {
  const job = {
    id: crypto.randomUUID(),
    ...jobData,
    applicants: [],
    createdAt: new Date().toISOString(),
  };
  jobs.push(job);
  return job;
};

export const getAllJobs = () => [...jobs];
export const getJobById = (id) => jobs.find((job) => job.id === id);

export const updateJob = (id, updatedFields) => {
  const index = jobs.findIndex((job) => job.id === id);
  if (index === -1) return null;
  jobs[index] = { ...jobs[index], ...updatedFields, id };
  return jobs[index];
};

export const deleteJob = (id) => {
  const originalLength = jobs.length;
  jobs = jobs.filter((job) => job.id !== id);
  return jobs.length !== originalLength;
};

export const addApplicant = (id, applicantData) => {
  const job = getJobById(id);
  if (!job) return null;
  const applicant = {
    id: crypto.randomUUID(),
    ...applicantData,
    appliedAt: new Date().toISOString(),
  };
  job.applicants.push(applicant);
  return applicant;
};

export const getApplicant = (jobId, applicantId) =>
  getJobById(jobId)?.applicants.find((applicant) => applicant.id === applicantId);

export const getAllApplicants = (jobId) =>
  getJobById(jobId)?.applicants || [];
