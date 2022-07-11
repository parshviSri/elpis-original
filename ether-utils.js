import { ethers } from "ethers";
import Elpis from './artifacts/contracts/Elpis.sol/Elpis.json';
const contractAddress = "0xf435d9fd013e28e85724edcf2b3ec671967babbd";
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
