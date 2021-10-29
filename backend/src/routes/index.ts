import { Router } from "express";
import { AdminRoutes } from "./admin";

export const router = Router();

// https://expressjs.com/en/guide/routing.html

router.use("/admin", AdminRoutes);

router.get("/", (req, res) => {
  res.send("Hello World!");
});
