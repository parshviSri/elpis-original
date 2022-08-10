import axios from 'axios';
import {decrypt} from '../../../lit-utils';

const CheckToken = async(profile)=>{
    let tokenId = parseInt(profile?.tokenId);
    const metadata={
      followerMetaData: "",
      followingMetaData: "",
      postMetaData:''
    };
    
    if(profile?.followerMetaData){
         let followerMetaData = await encryptData(
          profile?.followerMetaData,
          tokenId
        );
        metadata.followerMetaData = followerMetaData;
      };
    
    if (profile?.followingMetaData) {
     let followingMetaData= await encryptData(profile?.followingMetaData, tokenId);
        metadata.followingMetaData = followingMetaData;
    }
    if (profile?.postMetaData) {
      let postMetaData=await encryptData(profile?.postMetaData, tokenId);
        metadata.postMetaData = postMetaData;
    }
    return metadata;


}

const encryptData = async(data,tokenId)=>{
    let _data = await axios.get(data);
    let message= await axios.get(_data.data.message)
    let jsonData = {
      encryptedString: message.data,
      encryptedSymmetricKey: _data?.data?.encryptedSymmetricKey,
    };
    let encryptedString = jsonData?.encryptedString;
    let encryptedSymmetricKey = jsonData?.encryptedSymmetricKey;
    let encryptData = await decrypt(
      encryptedString,
      encryptedSymmetricKey,
      tokenId
    );
    let _encryptData = JSON.parse(encryptData.decryptedString);
    return _encryptData

}
export default CheckToken