import { walk } from "jsr:@std/fs/walk";
import { wildcardToRegExp } from "./wildcardToRegExp.ts";
import { SecretsUtilConfig } from "../models/SecretsUtilConfig.ts";
import { processFile } from "./processFile.ts";
import { logger } from "./logger.ts";

export async function processFiles(config: SecretsUtilConfig) {
  const filesToProcess: string[] = [];

  for await (const entry of walk(Deno.cwd(), {
    match: config.include.map(pattern => wildcardToRegExp(pattern)),
    maxDepth: config.recurse ? Infinity : 1
  })) {
    if (entry.isFile) {
      filesToProcess.push(entry.path);
    }
  }

  for (const filePath of filesToProcess) {
    await processFile(filePath, config.replace);
  }

  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0]; // Get the time part (HH:MM:SS)
  
  logger.log(`${timeString} Processing complete.`);
}
