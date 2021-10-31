import * as express from "express";
import { DatabaseSeedService } from "../services/DatabaseSeederService";
const seed = async (req: express.Request, res: express.Response) => {
  //TODO: need to check if current user is logged in
  //TODO: need to check if curren user is admin

  await DatabaseSeedService.seed();

  res.json("seed ok");
};
export const DatabaseSeedController = {
  seed,
};
