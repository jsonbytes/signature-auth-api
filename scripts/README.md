# Scripts
The scripts folder is a place to locate utility scripts that are intended to run outside of the application. Besides the script provided with this repo, it might be useful to write scripts to generate jwt-keys and store them to a `.env` file, for example.

### generate-signed-payload.script.js

This utility script utilizes the latest version of [ethersjs](https://docs.ethers.org/v6/) to generate private and public keys for an Ethereum Blockchain wallet. In addition, it will generate a static `package.json` and `users.ts` files for use in testing the API.