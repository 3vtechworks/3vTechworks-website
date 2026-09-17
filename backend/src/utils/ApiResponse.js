export class ApiResponse {
  constructor(statusCode, data, message = 'Success', meta) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    if (data !== undefined) {
      this.data = data;
    }
    if (meta) {
      this.meta = meta;
    }
  }

  static success(data, message = 'Operation successful', statusCode = 200) {
    return new ApiResponse(statusCode, data, message);
  }

  static created(data, message = 'Resource created successfully') {
    return new ApiResponse(201, data, message);
  }

  static paginated(data, meta, message = 'Data retrieved successfully') {
    return new ApiResponse(200, data, message, meta);
  }
}
