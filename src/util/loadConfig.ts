import { SecretsUtilConfig } from "../models/SecretsUtilConfig.ts";
import { logger } from "./logger.ts";

export async function loadConfig(filePath: string): Promise<SecretsUtilConfig> {
    const config = {
        include: [ '*.from-secrets', '*.from-secrets.txt' ],
        recurse: true,
        period: 10,
    } as SecretsUtilConfig;

    const envFilePath = filePath;
    try {
        const envFileContent = await Deno.readTextFile(envFilePath);
        const envVariables: Record<string, string> = {};
        envFileContent.split("\n").forEach(line => {
            const [key, value] = line.split("=");
            if (key && value && line.trim().startsWith("#") === false) {
                envVariables[key.trim()] = value.trim();
            }
        });
        config.replace = envVariables;
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            logger.log(`No corresponding .env file found for ${filePath}`);
        } else {
            throw error;
        }
    }

    logger.log('res is', config);
    return config;
}

