import { exists } from "jsr:@std/fs/exists";

export async function createConfigFile() {
//   if (await exists("secrets.json")) {
//     console.log("secrets.json file already exists.");
//   } else {
//     const configContent = `{
//     "include": [ "*.from-secrets" ],
//     "recurse": true,
//     "period": 10
// }`;
//     await Deno.writeTextFile("secrets.json", configContent);
//     console.log("secrets.json file created.");
//   }

  if (await exists("secrets.env")) {
    console.log("secrets.env file already exists.");
  } else {
    const configEnvContent = `
PORT=3001
DB_PASSWORD=password123
REACT_APP_PROXY_API_URL=https://00n-name-here.fly.dev
REACT_APP_MY_ENDPOINT=/execute
REACT_APP_PROXY_API_KEY=ABCDEFGHIJKLMNOPQRSTUVWXYZ
`;
    await Deno.writeTextFile("secrets.env", configEnvContent);
    console.log("secrets.env file created.");
  }

}
