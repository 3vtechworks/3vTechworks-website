import { http } from './http';
import { ApiResponse } from '../types/api.types';

export interface ContactInquiry {
  _id: string;
  name: string;
  email: string;
  serviceType: string;
  timeline: string;
  projectDetails: string;
  status: 'new' | 'in-review' | 'responded';
  createdAt: string;
  updatedAt: string;
}

export interface SubmitInquiryData {
  name: string;
  email: string;
  serviceType: string;
  timeline: string;
  projectDetails: string;
}

export interface InquiriesResponse {
  items: ContactInquiry[];
  total: number;
}

export const contactApi = {
  // POST: Public submission from website contact form
  submitInquiry: (data: SubmitInquiryData): Promise<ApiResponse<ContactInquiry>> => {
    return http.post<ApiResponse<ContactInquiry>>('/contact', data);
  },

  // GET: Admin dashboard fetches inquiries
  getInquiries: (): Promise<ApiResponse<InquiriesResponse>> => {
    return http.get<ApiResponse<InquiriesResponse>>('/contact');
  },

  // DELETE: Admin removes an inquiry
  deleteInquiry: (id: string): Promise<ApiResponse<null>> => {
    return http.delete<ApiResponse<null>>(`/contact/${id}`);
  },
};

export default contactApi;
