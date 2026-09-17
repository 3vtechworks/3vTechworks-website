/**
 * API Client Re-export
 *
 * NOTE: Do not define API endpoints here.
 * All HTTP methods (get, post, put, patch, delete) and domain-specific APIs
 * (e.g., usersApi, authApi) are organized in the `src/api/` directory.
 */

import apiClient from '../api/client';
export * from '../api/client';
export * from '../api/http';
export default apiClient;
