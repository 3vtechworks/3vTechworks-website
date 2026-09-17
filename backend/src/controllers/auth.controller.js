import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export class AuthController {

  static login = asyncHandler(async (req, res) => {
    const result = await AuthService.login(req.body);
    res.status(200).json(ApiResponse.success(result, 'Logged in successfully'));
  });

  static getProfile = asyncHandler(async (req, res) => {
    const user = await AuthService.getCurrentUser(req.user._id.toString());
    res.status(200).json(ApiResponse.success(user, 'Current user profile fetched successfully'));
  });
}
