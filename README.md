# Building-a-Celo-Oracle-for-Off-Chain-Data-A-Step-by-Step-Guide

This repository contains the source code for a tutorial on building an oracle using the Celo blockchain. The project demonstrates how to create a smart contract, an off-chain server to fetch data from a RESTful API, and a client-side application to display the data submitted to the Celo blockchain. By following the tutorial and exploring this repository, you can create your own oracle to securely provide off-chain data to your smart contracts.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)

## Getting Started

Clone this repository to your local machine:

```bash
git clone https://github.com/your_username/celo-oracle.git
```
## Prerequisites
Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/en)
- [Truffle Suite](https://trufflesuite.com/)
- [Celo Extension Wallet](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh) (Chrome extension)

Additionally, sign up for a free API key from [OpenWeather API](https://openweathermap.org/api).

## Installation
Navigate to the project directory and install the required packages:

```bash
cd celo-oracle
npm install
```

## Usage

1. Update the privateKey and accountAddress variables in the server/index.js file with your own private key and MetaMask account address, respectively.
2. Update the OPEN_WEATHER_API_KEY variable in the server/index.js file with your OpenWeather API key.
3. Run the off-chain server:

```bash
cd server
npm start
```

## Deployment
Deploy the smart contract to the Celo Alfajores test network by running the following command in the project directory:

```bash
truffle migrate --network alfajores
```

## Built With
- [Celo](https://celo.org/developers)
- [Solidity](https://soliditylang.org/)
- [Truffle Suite](https://trufflesuite.com/)
- [Node.js](https://nodejs.org/en)
- [OpenWeather API](https://openweathermap.org/api)
- [Axios](https://github.com/axios/axios)
- [Web3.js](https://web3js.readthedocs.io/en/v1.8.2/)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
