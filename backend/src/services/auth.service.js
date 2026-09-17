import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export class AuthService {
  static generateToken(user) {
    return jwt.sign(
      { id: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }



  static async login(input) {
    const user = await User.findOne({ email: input.email.toLowerCase() }).select('+password');
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password.');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Your account has been deactivated. Please contact support.');
    }

    const isMatch = await user.comparePassword(input.password || '');
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password.');
    }

    const token = this.generateToken(user);
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      token,
    };
  }

  static async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found.');
    }
    return user;
  }
}
