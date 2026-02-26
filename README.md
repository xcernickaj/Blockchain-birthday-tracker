# Blockchain-birthday-tracker
A relatively simple project. It consists of a smart contract deployable to the blockchain, which keeps a list of accounts and their birthdays. On each birthday, it sends a certain amount of money to this account. Project mainly exists as an exercise for creating smart contracts.

Project consists of a simple smart contract written in Solidity, designed to automatically send birthday wishes and Ethereum payments to specified addresses when the owner triggers it. The contract is deployed and tested using Hardhat, a framework for Ethereum development.

## Project Structure
- **contracts/**: Contains the `birthday_tracker.sol` file, which is the main smart contract.
- **scripts/**: 
  - `deploy.js`: A JavaScript script used to deploy the smart contract to the Ethereum blockchain.
  - `test_birthday_tracker.js`: A simple test script that verifies the basic functionality of the smart contract.

### Workflow:
1. **Deployment**: 
   - Deploy the contract using the provided `deploy.js` script.
   - After deployment, copy the **contract address** and **owner address** from the console output.
   - Paste them into the `test_birthday_tracker.js` file in the appropriate variables (`owner_address` and `tracker_address`) at the top of the script.
   
2. **Testing**: 
   - After deployment and configuration, run the `test_birthday_tracker.js` script to test the functionality of the contract.

## Requirements

- **Hardhat**: Make sure you have [Hardhat](https://hardhat.org) installed. You can install it with npm:
```npm install --save-dev hardhat```


- **Node.js**: Ensure that you have Node.js installed on your system.

## Setup and Usage

### 1. Install Dependencies

Start by installing the required dependencies in your project folder:
```npm install```


### 2. Deploy the Contract

Use the `deploy.js` script to deploy the smart contract to your desired network. Here's how to run it:
```npx hardhat run scripts/deploy.js --network <network_name>```


Make sure to replace `<network_name>` with the appropriate network (e.g., `rinkeby`, `mainnet`, or any custom network you have configured in your Hardhat setup).

### 3. Test the Contract

Once the contract is deployed, update the `test_birthday_tracker.js` file with the **contract address** and **owner address** (as mentioned above). Then run the test:
```npx hardhat run scripts/test_birthday_tracker.js --network <network_name>```


### Hardhat Commands

For general Hardhat commands like testing, compiling, or deploying, you can use the following:

- **Compile contracts**:
```npx hardhat compile```

- **Test contracts**:
```npx hardhat test```

- **Deploy contracts**:
```npx hardhat run scripts/deploy.js```

## How the Smart Contract Works

The Birthday Tracker contract is designed to send Ethereum payments to a list of recipient addresses whenever it is triggered. Below are the key features and functions:

1. **Modifiable Address List**: The smart contract allows the owner to modify the list of recipient addresses. This can be done by calling the `addRecipient` or `removeRecipient` functions.

2. **Birthday Payments**: The contract is capable of sending Ethereum payments to each recipient address on their birthday. The date for each recipient's birthday is stored in the contract, and the contract will send payments when triggered.

3. **Depositing and Withdrawing**: The contract can accept Ether deposits and can also withdraw Ether back to the owner's address. The smart contract holds a balance that can be used to pay recipients on their birthdays.

4. **External Script**: Since smart contracts cannot autonomously trigger actions based on real-world time (like sending payments on birthdays), an external script must be used to call the contract function at the correct time. This script can either be run daily or only when a birthday is detected (which needs to be tracked outside the blockchain).

### Diagram Overview
- The *activity diagram* (from the documentation on page 2) shows how the contract's functions interact with external scripts to send payments to the addresses on the correct days. 
- The *contract functions diagram* displays how internal and external functions are separated in the contract (functions for modifying addresses, viewing recipients, making payments, etc.), with colors differentiating visibility (green for public/external functions and red for internal functions).

## Use Cases
This contract is ideal for situations where you want to automatically send payments to people on specific dates (e.g., birthdays), without needing a centralized system to track those dates.

### Example Use Case:
- You can add a list of recipients with their Ethereum addresses and birthdays to the smart contract.
- The contract will automatically send a gift (in the form of Ether) on each recipient's birthday when called.

## Conclusion

This smart contract leverages the security and decentralization of the blockchain to automate birthday payments, reducing the need for manual intervention. It's a great example of how blockchain can be used for tasks that are less time-sensitive and don't require frequent data modifications.
