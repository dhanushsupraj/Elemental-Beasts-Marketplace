const hre = require("hardhat");

async function main() {
  console.log(`Deploying GameCardMarketplace to ${hre.network.name}...`);

  const GameCardMarketplace = await hre.ethers.getContractFactory("GameCardMarketplace");
  const marketplace = await GameCardMarketplace.deploy();
  await marketplace.waitForDeployment();

  const address = await marketplace.getAddress();
  console.log(`✅ GameCardMarketplace deployed to: ${address}`);
  console.log("");
  console.log("Next steps:");
  console.log(`1. Add this address to frontend/src/contractConfig.js as CONTRACT_ADDRESS`);
  console.log(`2. Add it to your README under 'Testnet & contract address'`);
  console.log(`3. (Optional) Verify on Etherscan:`);
  console.log(`   npx hardhat verify --network ${hre.network.name} ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
