import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// Public: Visitors can submit inquiries without logging in
router.post('/', ContactController.submitInquiry);

// Admin-only: View and manage inquiries in the dashboard
router.get('/', authenticate, authorize('admin'), ContactController.getInquiries);
router.delete('/:id', authenticate, authorize('admin'), ContactController.deleteInquiry);

export default router;
