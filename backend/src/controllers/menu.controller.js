import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Menu } from "../models/Menu.model.js";

export class MenuController {
  // Helper to generate next auto-incremented menuId starting from MENU0001
  static generateNextMenuId = async () => {
    const menus = await Menu.find(
      { menuId: /^MENU\d+$/i },
      { menuId: 1 },
    ).lean();
    let maxNum = 0;
    for (const m of menus) {
      const match = m.menuId.match(/^MENU(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    }
    const nextNumber = maxNum + 1;
    return `MENU${String(nextNumber).padStart(4, "0")}`;
  };

  // GET: Calculate next auto-incremented menuId
  static getNextMenuId = asyncHandler(async (_req, res) => {
    const nextMenuId = await MenuController.generateNextMenuId();
    res
      .status(200)
      .json(
        ApiResponse.success(
          { nextMenuId },
          "Next menu ID calculated successfully.",
        ),
      );
  });

  // POST: Create a new menu
  static createMenu = asyncHandler(async (req, res) => {
    let { menuId, menuName, role, path, icon, order, isActive } = req.body;

    if (!menuName || !menuName.trim()) {
      throw ApiError.badRequest("Menu name is required.");
    }

    if (!menuId || !menuId.trim()) {
      menuId = await MenuController.generateNextMenuId();
    } else {
      menuId = menuId.trim();
      const existingMenu = await Menu.findOne({ menuId });
      if (existingMenu) {
        throw ApiError.conflict(
          `A menu with menuId '${menuId}' already exists.`,
        );
      }
    }

    const newMenu = await Menu.create({
      menuId,
      menuName: menuName.trim(),
      role: role ? role.toLowerCase() : "admin",
      path: path ? path.trim() : "",
      icon: icon ? icon.trim() : "",
      order: order !== undefined ? Number(order) : 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res
      .status(201)
      .json(ApiResponse.created(newMenu, "Menu created successfully."));
  });

  // GET: Retrieve all menus (with optional role or search filtering)
  static getMenus = asyncHandler(async (req, res) => {
    const { role, isActive, search } = req.query;

    const filter = {};

    if (role) {
      filter.role = role.toLowerCase();
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true" || isActive === true;
    }

    if (search) {
      filter.$or = [
        { menuName: { $regex: search, $options: "i" } },
        { menuId: { $regex: search, $options: "i" } },
      ];
    }

    const menus = await Menu.find(filter).sort({ order: 1, createdAt: 1 });
    const totalCount = await Menu.countDocuments(filter);

    res.status(200).json(
      ApiResponse.success(
        {
          items: menus,
          total: totalCount,
        },
        "Menus retrieved successfully.",
      ),
    );
  });

  // GET: Retrieve single menu by _id or menuId
  static getMenuById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { menuId: id }] };
    } else {
      query = { menuId: id };
    }

    const menu = await Menu.findOne(query);
    if (!menu) {
      throw ApiError.notFound("Menu not found.");
    }

    res
      .status(200)
      .json(ApiResponse.success(menu, "Menu retrieved successfully."));
  });

  // PUT/PATCH: Update a menu by _id or menuId
  static updateMenu = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { menuId, menuName, role, path, icon, order, isActive } = req.body;

    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { menuId: id }] };
    } else {
      query = { menuId: id };
    }

    const menu = await Menu.findOne(query);
    if (!menu) {
      throw ApiError.notFound("Menu not found.");
    }

    // Check if new menuId collides with an existing record
    if (menuId && menuId.trim() !== menu.menuId) {
      const duplicate = await Menu.findOne({
        menuId: menuId.trim(),
        _id: { $ne: menu._id },
      });
      if (duplicate) {
        throw ApiError.conflict(
          `A menu with menuId '${menuId}' already exists.`,
        );
      }
      menu.menuId = menuId.trim();
    }

    if (menuName !== undefined) menu.menuName = menuName.trim();
    if (role !== undefined) menu.role = role.toLowerCase();
    if (path !== undefined) menu.path = path.trim();
    if (icon !== undefined) menu.icon = icon.trim();
    if (order !== undefined) menu.order = Number(order);
    if (isActive !== undefined) menu.isActive = Boolean(isActive);

    await menu.save();

    res
      .status(200)
      .json(ApiResponse.success(menu, "Menu updated successfully."));
  });

  // DELETE: Delete a menu by _id or menuId
  static deleteMenu = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { menuId: id }] };
    } else {
      query = { menuId: id };
    }

    const menu = await Menu.findOneAndDelete(query);
    if (!menu) {
      throw ApiError.notFound("Menu not found.");
    }

    res
      .status(200)
      .json(ApiResponse.success(null, "Menu deleted successfully."));
  });
}
