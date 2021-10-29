import { Router } from "express";
import { AdminController } from "../../controllers/adminController";

export const AdminRoutes = Router();

AdminRoutes.get("/:id", AdminController.getAdminById);
AdminRoutes.get("/:username", AdminController.getAdminByUsername);
AdminRoutes.get("/", (req, res) => {});
