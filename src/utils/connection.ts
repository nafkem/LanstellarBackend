

// // const { ABI } = require(".././config/abi");
// import { newKit } from "@celo/contractkit";
// import { COMMON_CONFIG } from "../config/common";
// import Web3 from "web3";
// const web3 = new Web3(COMMON_CONFIG.NETWORK_CONFIG.TESTNET_RPC);

// const HelloWorld = require("../config/abi.json");





// // Require ContractKit and newKitFromWeb3
// const { ContractKit, newKitFromWeb3 } = require("@celo/contractkit");
// export const kit = newKitFromWeb3(web3);


// export async function initContract() {

// const networkId = await web3.eth.net.getId();

// // Get the contract associated with the current network
// const deployedNetwork = HelloWorld.networks[networkId];

// // Create a new contract instance with the HelloWorld contract info
// let instance = new kit.web3.eth.Contract(
//     HelloWorld.abi,
//     deployedNetwork && deployedNetwork.address
//   );
  
// return instance;
// }




