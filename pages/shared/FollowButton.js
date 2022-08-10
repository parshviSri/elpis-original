import { useState, useEffect } from "react";
import { getAccount, connectContract } from "../../ether-utils";
import { useRouter } from "next/router";
import { addFile } from "../../ipfs-utils";
import{encrypt} from '../../lit-utils';

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
    let Following = await updateFollowing();
    // the current profile is profile Page
    let Follower = await updateFollowers();
    console.log("Follower", Follower);
    console.log("Following", Following);
    let follower = await addFile(JSON.stringify(Follower));
    let following = await addFile(JSON.stringify(Following));
    let trans = await elpis.followProfile(id, follower, following);
    await trans.wait();

    
    const event = await elpis.on(
      "StartedFollowing",
      (follwerhandle, follwinghandle) => {
        setshowFollow(false);
      }
    );
  };
  const updateFollowing = async () => {
    let updatefollowings;

    if (currentUser.followingsMetaData) {

      updatefollowings = currentUser.followingsMetaData;

      updatefollowings.data.followings.push(profilePage.handle);

      updatefollowings.data.followingCount += 1;

    } else {
      updatefollowings = {
        handle: currentUser.handle,

        followings: [profilePage.handle],

        followingCount: 1,
      };
          
    }
    const { encryptedString, encryptedSymmetricKey } = await encrypt(
     JSON.stringify(updatefollowings),
     profilePage.tokenId
   );
   let contentJson = {
     encryptedSymmetricKey,
     message: await addFile(encryptedString),
   };


    return contentJson;
  };


  const updateFollowers = async () => {
    let updatefollower;

    if (profilePage.followerMetaData) {
      updatefollower = profilePage.followerMetaData;
      console.log(updatefollower);
      updatefollower.followers.push(currentUser.handle);
      updatefollower.followersCount = +1;


    } else {
       updatefollower = {
        handle: profilePage.handle,

        followers: [currentUser.handle],

        followersCount: 1,
      };
    }
      const { encryptedString, encryptedSymmetricKey } = await encrypt(
        JSON.stringify(updatefollower),
        profilePage.tokenId
      );
      let contentJson = {
        encryptedSymmetricKey,
        message: await addFile(encryptedString),
      };

    return contentJson;
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
