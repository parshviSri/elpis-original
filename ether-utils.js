import { ethers } from "ethers";
import Elpis from './artifacts/contracts/Elpis.sol/Elpis.json';
const contractAddress = "0x9Af4eF8D4D0b6DB0894A2AAA78B4123e8DBaE089";
const NFTcontractAddress = "0x1A42792b6eb06C4D2a0bEFDee8470Be735B26FFb";
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
