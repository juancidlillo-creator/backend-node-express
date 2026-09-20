import { Router } from 'express';
import { login } from '../controllers/authController.js';

const router = Router();

// Endpoint público
router.post('/login', login);

export default router;