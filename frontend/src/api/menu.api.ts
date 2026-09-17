import { http } from "./http";
import { ApiResponse } from "../types/api.types";

export interface MenuItem {
  _id: string;
  menuId: string;
  menuName: string;
  role: "admin" | "user";
  path?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenusResponse {
  items: MenuItem[];
  total: number;
}

export interface CreateMenuData {
  menuId?: string;
  menuName: string;
  role: "admin" | "user";
  path?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateMenuData extends Partial<CreateMenuData> {}

export const menuApi = {
  // GET: Fetch menus with optional role and status filters
  getMenus: (params?: {
    role?: "admin" | "user";
    isActive?: boolean;
    search?: string;
  }): Promise<ApiResponse<MenusResponse>> => {
    return http.get<ApiResponse<MenusResponse>>("/menus", { params });
  },

  // GET: Fetch next auto-incremented menu ID
  getNextMenuId: (): Promise<ApiResponse<{ nextMenuId: string }>> => {
    return http.get<ApiResponse<{ nextMenuId: string }>>("/menus/next-id");
  },

  // GET: Fetch single menu by ID or menuId
  getMenuById: (id: string): Promise<ApiResponse<MenuItem>> => {
    return http.get<ApiResponse<MenuItem>>(`/menus/${id}`);
  },

  // POST: Create a new menu (admin only)
  createMenu: (data: CreateMenuData): Promise<ApiResponse<MenuItem>> => {
    return http.post<ApiResponse<MenuItem>>("/menus", data);
  },

  // PUT: Update a menu by ID or menuId (admin only)
  updateMenu: (
    id: string,
    data: UpdateMenuData,
  ): Promise<ApiResponse<MenuItem>> => {
    return http.put<ApiResponse<MenuItem>>(`/menus/${id}`, data);
  },

  // DELETE: Delete a menu by ID or menuId (admin only)
  deleteMenu: (id: string): Promise<ApiResponse<null>> => {
    return http.delete<ApiResponse<null>>(`/menus/${id}`);
  },
};

export default menuApi;
