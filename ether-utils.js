import { ethers } from "ethers";
import Elpis from './artifacts/contracts/Elpis.sol/Elpis.json';
const contractAddress = "0xcAb386ea61A4e9b2234AC82960100C3152068030";
const NFTcontractAddress = "0x1cE96211A4b61848E636bC6B157a417393CEf989";
export const getAccount = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  let account = accounts[0].toString();
  return account;
};

export const connectContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, Elpis.abi, signer);
  return contract
};
