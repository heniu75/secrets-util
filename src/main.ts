import { exists } from "jsr:@std/fs/exists";
import { createConfigFile } from "./util/createConfigFile.ts";
import { loadConfigAndProcessFiles } from "./util/loadConfigAndProcessFiles.ts";
import { logger } from "./util/logger.ts";

const DEFAULT_CONFIG_FILE = "./secrets.env";
const ALTERNATIVE_CONFIG_FILE = "./secrets.env.txt";
const DEFAULT_PERIOD = 10;

async function main() {
    const args = Deno.args;
    const command = args[0];

    logger.log('args', args);
    if (command === "init") {
        await createConfigFile();
        return;
    }
    
    // First try to use the provided path, then try DEFAULT_CONFIG_FILE, then try ALTERNATIVE_CONFIG_FILE
    let configFilePath = args[0];
    
    if (!configFilePath || !await exists(configFilePath)) {
        configFilePath = DEFAULT_CONFIG_FILE;
        
        if (!await exists(configFilePath)) {
            configFilePath = ALTERNATIVE_CONFIG_FILE;
            
            if (!await exists(configFilePath)) {
                logger.error(`No configuration file found. Tried '${args[0] || ""}', '${DEFAULT_CONFIG_FILE}', and '${ALTERNATIVE_CONFIG_FILE}'.`);
                Deno.exit(1);
            }
        }
    }

    let period = await loadConfigAndProcessFiles(configFilePath);

    async function periodicProcessing() {
        period = await loadConfigAndProcessFiles(configFilePath);
        setTimeout(periodicProcessing, period);
    }

    setTimeout(periodicProcessing, period);
}

if (import.meta.main) {
    main();
}