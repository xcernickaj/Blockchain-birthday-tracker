// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BirthdayTracker
{
    address payable public owner;
    mapping (address => string) private names;
    mapping (address => uint256) private paymentAmounts;
    mapping (address => uint256) private birthdays;
    mapping (uint256 => address[]) private birthdayCelebrators;
    address[] addresses;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function removeByValue(address[] storage arr, address value) internal {
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                arr[i] = arr[arr.length - 1];
                arr.pop();
                return;
            }
        }
        revert("Value not found");
    }

    function getAddressInfo(address addr) external onlyOwner view returns (string memory, uint256, uint256) {
        require(address(0) != addr, "Invalid address");

        return (names[addr], paymentAmounts[addr], birthdays[addr]);
    }

    function addAddress(address addr, string memory name, uint256 paymentAmount, uint256 birthdayDate) external onlyOwner returns (bool) {
        require(address(0) != addr, "Invalid address");
        require(paymentAmount > 0, "Invalid payment amount");
        require(bytes(names[addr]).length == 0, "Address already exists");

        names[addr] = name;
        paymentAmounts[addr] = paymentAmount;
        birthdays[addr] = birthdayDate;
        birthdayCelebrators[birthdayDate].push(addr);
        addresses.push(addr);
        return true;
    }

    function removeAddress(address addr) external onlyOwner returns (bool) {
        require(address(0) != addr, "Invalid address");

        names[addr] = "";
        paymentAmounts[addr] = 0;  
        removeByValue(birthdayCelebrators[birthdays[addr]], addr);
        birthdays[addr] = 0;
        removeByValue(addresses, addr);
        return true;
    }

    function setPaymentAmount(address addr, uint256 paymentAmount) external onlyOwner returns (bool) {
        require(address(0) != addr, "Invalid address");
        require(paymentAmount > 0, "Invalid payment amount");

        paymentAmounts[addr] = paymentAmount;
        return true;
    }

    function withdraw(uint256 amountWei) public onlyOwner returns (bool) {
        require(address(this).balance >= amountWei, "Insufficient balance");
        
        (bool success, ) = owner.call{value: amountWei}("");
        require(success, "Payment failed");
        return true;
    } 

    function withdrawAll() external onlyOwner returns (bool) {
        require(address(this).balance > 0, "Insufficient balance");
        
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Payment failed");
        return true;
    }

    function payBirthdayCelebrators() external onlyOwner returns (bool) {
        uint today = block.timestamp / 1 days;
        
        for (uint i = 0; i < birthdayCelebrators[today].length; i++) {
            address curr = birthdayCelebrators[today][i];
            require(paymentAmounts[curr] <= address(this).balance, "Insufficient balance");
            (bool success, ) = curr.call{value: paymentAmounts[curr]}("");
            require(success, "Payment failed");
        }
        return true;
    }

    function getAddresses() external onlyOwner view returns (address[] memory) {
        return addresses;
    }

    receive() external payable {}
}