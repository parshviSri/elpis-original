// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage } from "nft.storage";
import axios from "axios";

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYxNTUwMDhEN0RBOGIwREU2RDNmMjYyNjBkMWMxZmMzNjhBYjg0MjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODM4NDc0MDAzMSwibmFtZSI6ImVscGlzTkZUIn0.RE0WCerwrZf1Htg_RS0P_hs7G5zmIWwyKET2sLXzOZY";

export async function storeNFT(imagePath, name, description,traits) {
  // load the file from ipfs
  console.log(imagePath);
  // console.log(await axios.get(imagePath));
  // const image = new File([await axios.get(imagePath)], "nft.png", {
  //   type: "image/png",
  // });
   const image= imagePath;
  console.log(image);
  const attributes = [
    {
      trait_type: "handle",
      value: traits[0],
    },
    {
      trait_type: "followers",
      value: traits[1],
    },
    {
      trait_type: "followings",
      value: traits[2],
    },
    {
      trait_type: "post",
      value: traits[3],
    },
  ];

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  console.log(name);
  console.log(image);
  console.log(description);
  console.log(attributes);
  
  return nftstorage.store({
    image,
    name,
    description,
    attributes
  });
}

