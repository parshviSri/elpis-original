import { addFile } from "./ipfs-utils";
import{storeNFT} from "./nftStorage";
export const addTokenUri= async(name,bio,image,handle,followers,followings,posts)=>{
    const token = {
      name,
      description: bio,
      image: image,
      attributes: [
        {
          trait_type: "handle",
          value: handle,
        },
        {
          trait_type: "followers",
          value: followers,
        },
        {
          trait_type: "followings",
          value: followings,
        },
        {
          trait_type: "posts",
          value: posts,
        },
      ],
    };
    let tokenUri= await addFile(JSON.stringify(token));
    return tokenUri;

}
export const addNFTStorage = async(
  name,
  bio,
  imageFile,
  handle,
  
)=>{
  console.log(imageFile,name, bio, handle);
  const token = {
    name:name,
    description: bio,
    attributes: [
      {
        trait_type: "handle",
        value: handle,
      }
    ],
  };
  let nft = await storeNFT(
    imageFile,
    token.name,
    token.description,
    token.attributes
  );
  console.log(nft);
}