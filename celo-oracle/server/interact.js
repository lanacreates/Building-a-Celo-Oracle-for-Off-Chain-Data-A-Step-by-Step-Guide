
const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
const Oracle = require("./build/contracts/Oracle.json");

const alfajoresRPC = "https://alfajores-forno.celo-testnet.org";
const web3 = new Web3(alfajoresRPC);
const kit = ContractKit.newKitFromWeb3(web3);

const oracleAddress = "0x25F726F284de4FE1a134a7d012dC72dE8E301B05";
const oracleContract = new kit.web3.eth.Contract(Oracle.abi, oracleAddress);

async function getRequest(requestId) {
  const request = await oracleContract.methods.getRequest(requestId).call();
  console.log(request);
}

const requestId = 1; // Replace this with the requestId you want to query
getRequest(requestId);
