// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require("dotenv").config();
const config = require("./config.json");

async function main() {
    // We get the contract to deploy
    const Contract = await ethers.getContractFactory("TipTipTap");
    const contract = await Contract.deploy(config.challenge, config.results, config.minimal, config.seri);

    console.log("Greeter deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });