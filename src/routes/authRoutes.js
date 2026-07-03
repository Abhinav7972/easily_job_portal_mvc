import { Router } from 'express';
import { login, logout, register, showLogin, showRegister } from '../controllers/User.controller.js';
import { validateLogin, validateRegistration } from '../middlewares/validation.js';

const router = Router();
router.get('/register', showRegister);
router.post('/register', validateRegistration, register);
router.get('/login', showLogin);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

export default router;
