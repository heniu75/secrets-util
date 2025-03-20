import { loadConfig } from "./loadConfig.ts";
import { processFiles } from "./processFiles.ts";
import { logger } from "./logger.ts";

export async function loadConfigAndProcessFiles(configFilePath: string) {
    try {
        const config = await loadConfig(configFilePath);
        logger.log('config', config);
        await processFiles(config);
        return config.period * 1000; // Convert period to milliseconds
    } catch (error) {
        logger.error("Error loading or processing config:", error);
        Deno.exit(1);
    }
}
