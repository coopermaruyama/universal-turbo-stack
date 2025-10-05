import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parentDir = path.dirname(__dirname);
export const basePath = parentDir.endsWith("packages/db")
  ? parentDir
  : path.dirname(parentDir);
