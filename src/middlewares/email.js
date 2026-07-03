import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
  }
  return nodemailer.createTransport({ jsonTransport: true });
};

export const sendApplicationConfirmation = async (req, res, next) => {
  try {
    await createTransporter().sendMail({
      from: process.env.MAIL_FROM || 'Easily Jobs <no-reply@easily.local>',
      to: req.body.email,
      subject: `Application received: ${res.locals.job.job_designation}`,
      text: `Hello ${req.body.name},\n\nYour application for ${res.locals.job.job_designation} at ${res.locals.job.company_name} has been received.\n\nRegards,\nEasily Jobs`,
    });
    res.locals.confirmationEmailSent = true;
  } catch (error) {
    console.error('Confirmation email could not be sent:', error.message);
    res.locals.confirmationEmailSent = false;
  }
  next();
};
