
const express = require("express");
const axios = require("axios");
const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
const { response } = require("express");
const path = require("path");
const privateKey = "your_private_key";
const accountAddress = "your_account_address";
const oracleAddress = "deployed_oracle_contract_address";
const alfajoresRPC = "https://alfajores-forno.celo-testnet.org";
const chainId = 44787; // The chainId for the Celo Alfajores testnet
const web3 = new Web3(alfajoresRPC);
const kit = ContractKit.newKitFromWeb3(web3);
kit.addAccount(privateKey);
const Oracle = require("../build/contracts/Oracle.json");
const oracleContract = new kit.web3.eth.Contract(Oracle.abi, oracleAddress);
const OPEN_WEATHER_API_KEY = "your_openweathermap_api_key";
async function fetchWeatherData(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`;
  const response = await axios.get(url);
  const weatherData = response.data;
  return weatherData;
}
async function submitDataToOracle(requestId, result) {
    const txObject = oracleContract.methods.fulfillRequest(requestId, result);
    const gas = await txObject.estimateGas({ from: accountAddress });
  
    const tx = await txObject.send({ from: accountAddress, gas, chainId });
  
    return tx;
  }
  
const app = express();
app.use(express.json());
app.post("/submit-data", async (req, res) => {
  const { requestId, city, path } = req.body;
  try {
    const weatherData = await fetchWeatherData(city);
    const kelvinTemperature = weatherData.main.temp;
    const celsiusTemperature = kelvinTemperature - 273.15;
    // Convert the floating-point temperature to an integer
    const temperatureInt = Math.round(celsiusTemperature * 100);
    // Submit the integer temperature value to the Oracle smart contract
    const tx = await submitDataToOracle(requestId, temperatureInt);
    res.send({ status: "success", message: "Data submitted successfully", tx });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Error submitting data", error: error.message ? error.message : error });
  }
});
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
