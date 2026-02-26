const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);
  
  const BirthdayContract = await hre.ethers.getContractFactory("BirthdayTracker");
  const birthdayContract = await BirthdayContract.deploy();
  await birthdayContract.deployed();
  console.log("Deployed contract on address: ", birthdayContract.address)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
