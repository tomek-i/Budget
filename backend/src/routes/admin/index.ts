import { Router } from "express";
import { AdminController } from "../../controllers/adminController";
import { ImportService } from "../../services/ImportService";
import { DatabaseRoutes } from "./database";

export const AdminRoutes = Router();

AdminRoutes.get("/test", async (req, res) => {

    let r = await ImportService.ImportData();
    res.set({'Content-Type': 'image/png'}).send(r);
});
// URL: ./admin/
AdminRoutes.get("/user/:id", AdminController.getAdminById);
AdminRoutes.get("/user/:username", AdminController.getAdminByUsername);
AdminRoutes.get("/", (req, res) => {});


AdminRoutes.use("/db", DatabaseRoutes);
