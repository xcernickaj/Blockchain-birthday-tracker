const { ethers } = require("hardhat");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

  const tracker_address = '0xFD6F7A6a5c21A3f503EBaE7a473639974379c351';
  const owner_address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

  const tracker_abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getAddressInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "paymentAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "birthdayDate",
          "type": "uint256"
        }
      ],
      "name": "addAddress",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "removeAddress",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "paymentAmount",
          "type": "uint256"
        }
      ],
      "name": "setPaymentAmount",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountWei",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "payBirthdayCelebrators",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAddresses",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ];
  const accounts = await ethers.getSigners();
  const test_account = accounts[2]; // the recipient/test address

  // Explicitly use the signer associated with the hardcoded owner address
  const ownerSigner = provider.getSigner(owner_address);

  // Attach contract to owner signer
  const tracker_contract = new ethers.Contract(tracker_address, tracker_abi, ownerSigner);

  // Send 5000 wei to the contract
  await ownerSigner.sendTransaction({
    to: tracker_address,
    value: ethers.utils.parseUnits("5000", "wei")
  });

  // Add test entry for 8 May 2025
  const unixDate = 1746662400;
  const tx1 = await tracker_contract.removeAddress(test_account.address);
  await tx1.wait();

  const tx2 = await tracker_contract.addAddress(test_account.address, "Palo", 100, unixDate);
  await tx2.wait();

  // Fetch and log info
  const info = await tracker_contract.getAddressInfo(test_account.address);
  console.log("Name:", info[0]);
  console.log("Payment Amount:", info[1].toString());
  console.log("Birthday:", info[2].toString());
}

main().catch(console.error);