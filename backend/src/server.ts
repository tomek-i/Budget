import * as dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { router } from "./routes";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const port = process.env.PORT || 3000;

if (!port) throw new Error("Invalid port.");

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
