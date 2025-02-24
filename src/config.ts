import { SecretsUtilConfig } from "./SecretsUtilConfig.ts";

export async function loadConfig(filePath: string): Promise<SecretsUtilConfig> {
    const res = {
        include: [ '*.from-secrets' ],
        recurse: true,
        period: 10,
    } as SecretsUtilConfig;

    const envFilePath = filePath
    try {
        const envFileContent = await Deno.readTextFile(envFilePath);
        const envVariables: Record<string, string> = {};
        envFileContent.split("\n").forEach(line => {
            const [key, value] = line.split("=");
            if (key && value && line.startsWith("#") === false) {
                envVariables[key.trim()] = value.trim();
            }
        });
        res.replace = envVariables;
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            console.log(`No corresponding .env file found for ${filePath}`);
        } else {
            throw error;
        }
    }

    console.log('res is', res);
    return res;
}

