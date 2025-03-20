import { basename, dirname, join } from "https://deno.land/std/path/mod.ts";
import { exists } from "jsr:@std/fs/exists";
import { logger } from "./logger.ts";

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
        // Get the filename and handle different extensions
        const filename = basename(filePath);
        let newFilename;
        
        if (filename.endsWith('.from-secrets.txt')) {
            // Remove the entire .from-secrets.txt suffix
            newFilename = filename.replace('.from-secrets.txt', '');
        } else {
            // For other cases, keep using the regex to properly handle other extensions
            newFilename = filename.replace(/\.from-secrets(\..*)?$/, '$1');
        }
        
        newFilePath = join(dirname(filePath), newFilename);
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
        logger.log(`No changes made to ${newFilePath}`);
    } else {
        logger.log(`Writing changes to ${newFilePath}`);
        await Deno.writeTextFile(newFilePath, fileOutput);
    }
}
