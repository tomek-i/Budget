import { Router } from "express";
import { DatabaseSeedController } from "../../../controllers/databaseSeedController";

export const DatabaseRoutes = Router();

// URL: ./admin/db/
DatabaseRoutes.get("/seed", DatabaseSeedController.seed);
