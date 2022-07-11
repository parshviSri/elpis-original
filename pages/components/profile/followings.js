import axios from "axios";
import { useEffect, useState } from "react";
import { getAccount, connectContract } from "../../../ether-utils";
import Card from "../../shared/Card";
const Followings = (props) => {
  const [followings, setFollowings] = useState([]);
  useEffect(() => {
    if (props.handle) {
      getFollowings();
    }
  }, []);
  const getFollowings = async () => {
    await getAccount();
    const elpis = await connectContract();
    const follwerMetaData = await axios.get(props.handle);
    console.log(follwerMetaData.data.followers.length);
    let _followers = [];
    for (let i = 0; i < follwerMetaData.data.followers.length; i++) {
      let _follower = await elpis.searchProfile(
        follwerMetaData.data.followers[i]
      );
      console.log(_follower);
      let dummyFollower = {
        name: _follower.name,
        handle: _follower.handle,
        bio: _follower.bio,
        profileImageUrl: _follower.profileImageUrl,
        coverImageUrl: _follower.coverImageUrl,
        follwerCount: parseInt(_follower.followerCount._hex),
        followingCount: parseInt(_follower.followingCount._hex),
      };

      _followers.push(dummyFollower);
    }
    setFollowings(_followers);
  };
  return (
    <div>
      Followings
      {followings.length == 0 && <div> Donot follow anybody yet !!</div>}
      {followings.length > 0 && 
        followings.map((following) => (
          <Card key={following.handle} profile={following} />
        ))}
    </div>
  );
};
export default Followings;
