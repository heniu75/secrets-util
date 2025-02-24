import { exists } from "jsr:@std/fs/exists";
import { loadConfig } from "./config.ts";
import { createConfigFile } from "./createConfigFile.ts";
import { processFiles } from "./processFiles.ts";

async function main() {
    const args = Deno.args;
    const command = args[0];

    console.log('args', args);
    if (command === "init") {
        await createConfigFile();
        return;
    }

    const configFilePath = args[0] || "./secrets.env";

    if (!await exists(configFilePath)) {
        console.error("'secrets.env' configuration file not found.");
        Deno.exit(1);
    }

    let config = await loadConfig(configFilePath);
    console.log('config', config);
    await processFiles(config);

    setInterval(async () => {
        config = await loadConfig(configFilePath);
        console.log('config', config);
        await processFiles(config);
    }, config.period * 1000); // Convert period to milliseconds
}

if (import.meta.main) {
    main();
}