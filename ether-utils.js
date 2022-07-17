import { ethers } from "ethers";
import Elpis from './artifacts/contracts/Elpis.sol/Elpis.json';
const contractAddress = "0x2F05800eA8152e5548b288588eB9EeD1c2947DE6";
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
