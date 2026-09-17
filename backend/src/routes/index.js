import { Router } from 'express';
import authRoutes from './auth.routes.js';
import contactRoutes from './contact.routes.js';
import healthRoutes from './health.routes.js';
import menuRoutes from './menu.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/menus', menuRoutes);

export default router;
