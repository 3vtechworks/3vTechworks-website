import { Router } from "express";
import { MenuController } from "../controllers/menu.controller.js";
import {
  authenticate,
  authorize,
  optionalAuthenticate,
} from "../middlewares/auth.middleware.js";

const router = Router();

// Public / Authenticated read access for menus
router.get("/", optionalAuthenticate, MenuController.getMenus);
router.get("/next-id", optionalAuthenticate, MenuController.getNextMenuId);
router.get("/:id", optionalAuthenticate, MenuController.getMenuById);

// Admin-only management endpoints
router.post("/", authenticate, authorize("admin"), MenuController.createMenu);
router.put("/:id", authenticate, authorize("admin"), MenuController.updateMenu);
router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  MenuController.updateMenu,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  MenuController.deleteMenu,
);

export default router;
