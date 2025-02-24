import { basename, dirname, join } from "https://deno.land/std/path/mod.ts";
import { exists } from "jsr:@std/fs/exists";

export async function processFile(filePath: string, replaceDict: Record<string, string>): Promise<void> {
  const fileContent = await Deno.readTextFile(filePath);
  let fileOutput = fileContent;

  // Look for SECRETS_TO_FILE line
  let newFilePath: string | null = null;
  const lines = fileContent.split("\n");
  for (const line of lines) {
    if (line.startsWith("SECRETS_FILE=")) {
      newFilePath = line.split("=")[1].trim();
      break;
    }
  }

  // If SECRETS_TO_FILE is not found, use the current logic
  if (!newFilePath) {
    newFilePath = join(dirname(filePath), basename(filePath, ".from-secrets"));
  }

  for (const [key, value] of Object.entries(replaceDict)) {
    const placeholder = `!{${key}}`;
    fileOutput = fileOutput.replace(new RegExp(placeholder, 'g'), value);
  }

  let existingFileContent = '';
  if (await exists(newFilePath)) {
    existingFileContent = await Deno.readTextFile(newFilePath);
  }

  if (fileOutput == existingFileContent) {
    console.log(`No changes made to ${newFilePath}`);
  } else {
    console.log(`Writing changes to ${newFilePath}`);
    await Deno.writeTextFile(newFilePath, fileOutput);
  }
}
