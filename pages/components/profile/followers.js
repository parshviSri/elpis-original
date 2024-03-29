import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAccount, connectContract } from "../../../ether-utils";
import Card from '../../shared/Card';
const Followers =(props)=>{
  console.log(props);
    const[followers, setFollowers] = useState([]);
    useEffect(()=>{
        if (props.metaData) {
          getFollower();
        }
    },[])
    const getFollower =async() =>{
        await getAccount();
        const elpis = await connectContract();
        const follwerMetaData = props.metaData;
        console.log(follwerMetaData);
        let _followers=[]
        for (let i = 0; i < follwerMetaData.followers.length; i++) {
          let _follower = await elpis.searchProfile(
            follwerMetaData.followers[i]
          );
          let dummyFollower = {
            name: _follower.name,
            handle: _follower.handle,
            bio: _follower.bio,
            profileImageUrl:_follower.profileImageUrl,
            coverImageUrl:_follower.coverImageUrl,
            follwerCount: parseInt(_follower.followerCount._hex),
            followingCount: parseInt(_follower.followingCount._hex),
          };
         
          _followers.push(dummyFollower);
        }
        setFollowers(_followers);
        

    }
    return (
      <div>
        Followers
        {followers.length == 0 && (
          <div>Do not have any follower yet !!</div>
        )}
        {followers.length > 0 &&
          followers.map((follower) => {
          return (
            
              <Card key={follower.handle} profile={follower} />
            
          )}
          )}
      </div>
    );
}
export default Followers;