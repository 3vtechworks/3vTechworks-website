import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Contact } from '../models/Contact.model.js';

export class ContactController {
  // Public: Submit inquiry from website contact form
  static submitInquiry = asyncHandler(async (req, res) => {
    const { name, email, serviceType, timeline, projectDetails } = req.body;

    if (!name || !email || !projectDetails) {
      throw ApiError.badRequest('Name, email, and project details are required.');
    }

    const inquiry = await Contact.create({
      name,
      email,
      serviceType,
      timeline,
      projectDetails,
    });

    res.status(201).json(ApiResponse.created(inquiry, 'Your inquiry has been submitted successfully.'));
  });

  // Admin-only: Fetch list of inquiries for admin dashboard
  static getInquiries = asyncHandler(async (req, res) => {
    const inquiries = await Contact.find().sort({ createdAt: -1 }).limit(100);
    const totalCount = await Contact.countDocuments();

    res.status(200).json(
      ApiResponse.success(
        {
          items: inquiries,
          total: totalCount,
        },
        'Inquiries retrieved successfully'
      )
    );
  });

  // Admin-only: Delete an inquiry
  static deleteInquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const inquiry = await Contact.findByIdAndDelete(id);

    if (!inquiry) {
      throw ApiError.notFound('Inquiry not found.');
    }

    res.status(200).json(ApiResponse.success(null, 'Inquiry deleted successfully'));
  });
}
