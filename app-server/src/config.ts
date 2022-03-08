import * as fs from "fs";
import * as path from "path";

interface Config {
  port: number;
  mongoHost: string;
  mongoDb: string;
  uploadSizeLimit: number;
}

const config: Config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config.json"), "utf-8")
);
export default config;
