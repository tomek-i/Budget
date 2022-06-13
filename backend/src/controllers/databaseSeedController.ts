import * as express from 'express';
import { DatabaseSeedService } from '../services/SeedService/DatabaseSeederService';

const clearUsers = async (req: express.Request, res: express.Response) => {
  await DatabaseSeedService.clearUsers();
  res.json('deleted all users');
};
const clearCategories = async (req: express.Request, res: express.Response) => {
  await DatabaseSeedService.clearCategories();
  res.json('deleted all categories');
};
/**
 * will delete all entities and re-seed the database
 * @param req
 * @param res
 */
const seed = async (req: express.Request, res: express.Response) => {
  //TODO: need to check if current user is logged in
  //TODO: need to check if curren user is admin
  await DatabaseSeedService.seed();
  res.json('seed ok');
};
const seedUsers = async (req: express.Request, res: express.Response) => {
  //TODO: need to check if current user is logged in
  //TODO: need to check if curren user is admin
  await DatabaseSeedService.seedUsers();
  res.json('seed users ok');
};
const seedCategories = async (req: express.Request, res: express.Response) => {
  //TODO: need to check if current user is logged in
  //TODO: need to check if curren user is admin
  await DatabaseSeedService.seedCategories();
  res.json('seed categories ok');
};
export const DatabaseSeedController = {
  seed,
  seedUsers,
  seedCategories,
  clearUsers,
  clearCategories,
};
