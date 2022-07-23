import { useState, useEffect } from "react";
import { getAccount, connectContract } from "../../ether-utils";
import { useRouter } from "next/router";
import { addFile } from "../../ipfs-utils";
import axios from "axios";

const FollowButton = (props) => {
  const router = useRouter();
  const profilePage = props.profile;
  const { id } = router.query;
  const [showFollow, setshowFollow] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    setInterval(() => {
      getCurrentAddress();
    }, 1000);
  }, []);
  useEffect(() => {
    getCurrentUser();
  }, [currentAccount]);

  const getCurrentAddress = async () => {
    let account = await getAccount();
    setCurrentAccount(account);
  };
  const getCurrentUser = async () => {
    let elpis = await connectContract();
    let _currentuser = await elpis.getProfile();
    setCurrentUser(_currentuser);
    if (_currentuser.handle == id) {
      setshowFollow(false);
    }
  };
  const follow = async () => {
    let elpis = await connectContract();

    // the current account is the current user
    let cuFollowing = await updateCuFollowing();
    let cuFollowingMD = cuFollowing.metaData;
    let cuFollowingTURI = cuFollowing.tokenUri;
    // the current profile is profile Page
    let ppFollower = await updatePpFollowers();
    let ppFollowerMD = ppFollower.metaData;
    let ppFollowerTURI = ppFollower.tokenUri;
    let trans = await elpis.followProfile(
      id,
      ppFollowerMD,
      cuFollowingMD,
      ppFollowerTURI,
      cuFollowingTURI
    );
    await trans.wait();
    const event = await elpis.on(
      "StartedFollowing",
      (follwerhandle, follwinghandle) => {
        setshowFollow(false);
      }
    );
  };
  const updateCuFollowing = async () => {
    let elpis = await connectContract();
    let tUri = await elpis.getTokenUri(parseInt(currentUser.tokenId._hex));
    console.log(tUri);
    let turiD = await axios.get(tUri);
    console.log(turiD);
    let updatefollowings = { metaData: "", tokenUri: "" };

    if (currentUser.followingsMetaData) {

      let followingsMetaData = await axios.get(currentUser.followerMetaData);

      followingsMetaData.data.followings.push(profilePage.handle);

      followingsMetaData.data.followingCount += 1;

      updatefollowings.metaData = await addFile(
        JSON.stringify(followingsMetaData.data)
      );

        turiD.attributes[2].value = followingsMetaData.data.followingCount;

    } else {
      let followingsMetaData = JSON.stringify({
        handle: currentUser.handle,

        followings: [profilePage.handle],

        followingCount: 1,
      });
      turiD.attributes[2].value =1;

      updatefollowings.metaData = await addFile(followingsMetaData);
    }
  updatefollowings.tokenUri = await addFile(turiD);

    return updatefollowings;
  };
  const updatePpFollowers = async () => {
    let elpis = await connectContract();
    let tUri = await elpis.getTokneUri(parseInt(profilePage.tokenId._hex));
    let turiD = await axios.get(tUri);
    let updatefollower ={metaData:'',tokenUri:''};

    if (profilePage.followerMetaData) {
      let followerMetaData = await axios.get(profilePage.followerMetaData);
      console.log(followerMetaData);
      followerMetaData.data.followers.push(currentUser.handle);
      followerMetaData.data.followersCount = +1;

      updatefollower.metaData = await addFile(
        JSON.stringify(followerMetaData.data)
      );
      turiD.attributes[2].value = followerMetaData.data.followersCount;

    } else {
      let followerMetaData = JSON.stringify({
        handle: profilePage.handle,

        followers: [currentUser.handle],

        followersCount: 1,
      });
      updatefollower.metaData = await addFile(followerMetaData);
    }
    updatefollower.tokenUri= await addFile(turiD)
    return updatefollower;
  };
  
  return (
    <div className="ml-8 px-2 py-4">
      {showFollow && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={follow}
        >
          Follow
        </button>
      )}
    </div>
  );
};
export default FollowButton;
