import { useEffect, useState } from "react";
import Post from "./post";
import Followers from "./followers";
import Followings from "./followings";
import { getAccount, connectContract } from "../../../ether-utils";
import { useRouter } from "next/router";
import { addFile } from "../../../ipfs-utils";

import axios from "axios";
const Profile = (props) => {
  const router = useRouter();

  const { id } = router.query;
  const userProfile = props.profile;
  console.log(userProfile);
  const followerCount = parseInt(userProfile.followerCount._hex);
  const followingCount = parseInt(userProfile.followingCount._hex);
  const postCount = parseInt(userProfile.postCount._hex);
  const [tab, setTab] = useState({
    id: "post",
    activeClass:
      "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
  });
  const [showFollow, setShowFollow] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    currentUser();
  }, [id]);
  const currentUser = async () => {
    let account = await getAccount();
    let elpis = await connectContract();
    let _currentuser = await elpis.getProfile();
    if (_currentuser.handle == id) {
      setShowFollow(false);
    } else {
      setShowFollow(true);
    }
    return _currentuser;
  };
  const followProfile = async () => {
    let elpis = await connectContract();
    let _currentuser = await currentUser();
    let updatefollowerMetaData = "";
    let updatefollowingsMetaData = "";
    if (userProfile.followerMetaData) {
      let followerMetaData = await axios.get(userProfile.followerMetaData);
            console.log(followerMetaData);

      followerMetaData.data.followers.push(_currentuser.handle);
      followerMetaData.data.followersCount = +1;
      console.log(followerMetaData.data.followers);
      updatefollowerMetaData = await addFile(JSON.stringify(followerMetaData.data));
    } else {
      let followerMetaData = JSON.stringify({
        handle: userProfile.handle,

        followers: [_currentuser.handle],

        followersCount: 1,
      });
      updatefollowerMetaData = await addFile(followerMetaData);
    }
    if (_currentuser.followingsMetaData) {
      let followingsMetaData = await axios.get(_currentuser.followerMetaData);
      console.log(followingsMetaData);
      followingsMetaData.data.followings.push(userProfile.handle);
      followingsMetaData.data.followings += 1;
      console.log(followingsMetaData.data);
      updatefollowingsMetaData = await addFile(JSON.stringify(followingsMetaData.data));
    } else {
      let followingsMetaData = JSON.stringify({
        handle: _currentuser.handle,

        followers: [userProfile.handle],

        followersCount: 1,
      });
      updatefollowingsMetaData = await addFile(followingsMetaData);
    }

    console.log(
      "updatefollowerMetaData,updatefollowingsMetaData",
      updatefollowerMetaData,
      updatefollowingsMetaData
    );
    let trans = await elpis.followProfile(
      id,
      updatefollowerMetaData,
      updatefollowingsMetaData
    );
    await trans.wait();
    const event = await elpis.on(
      "StartedFollowing",
      (follwerhandle, follwinghandle) => {
        setShowFollow(false);
      }
    );
  };
  const searchProfile = async () => {
    currentUser();
    let account = await getAccount();
    let elpis = await connectContract();
    let trans = await elpis.searchProfile(search);
    router.push({ pathname: "/dashboard", query: { id: trans.handle } });
  };
  return (
    <div className="w-full h-full">
      <label
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search other profiles"
          required
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={searchProfile}
        >
          Search
        </button>
      </div>
      <img
        className="object-fill h-48 w-full"
        src={userProfile.coverImageUrl || "/DefaultBackground.png"}
        alt="Cover Image"
      />
      <div className=" flex w-3/12 sm:w-4/12 px-4">
        <img
          src={userProfile.profileImageUrl || "/noImage.png"}
          alt="..."
          className="shadow rounded-full max-w-48 h-28 align-middle border-none"
        />
        <div>
          <p className="text-bold text-4xl border-b">
            {userProfile.name || "No Name"}
          </p>
          <p className="text-2xl px-2">{userProfile.handle || "No Handle"}</p>
        </div>
        <div className="ml-8 px-2 py-4">
          {/* Follow Button will come here */}
          <div className="ml-8 px-2 py-4">
            {showFollow && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={followProfile}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 p-2 px-5 border-b">
        <p>{userProfile.bio || "Your Bio will come here a long sentences"}</p>
      </div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="basis-1/4" role="presentation">
            <button
              className={tab.id == "post" && tab.activeClass}
              onClick={() => {
                setTab({
                  id: "profile",
                  activeClass: "inline-block p-4 rounded-t-lg border-b-2",
                });
              }}
            >
              Post:{postCount}
            </button>
          </li>
          <li className="basis-1/4" role="presentation">
            <button
              className={tab.id == "follower" && tab.activeClass}
              onClick={() => {
                setTab({
                  id: "followers",
                  activeClass: "inline-block p-4 rounded-t-lg border-b-2",
                });
              }}
            >
              Followers:{followerCount}
            </button>
          </li>
          <li className="basis-1/4" role="presentation">
            <button
              className={tab.id == "following" && tab.activeClass}
              onClick={() => {
                setTab({
                  id: "followings",
                  activeClass: "inline-block p-4 rounded-t-lg border-b-2",
                });
              }}
            >
              Followings:{followingCount}
            </button>
          </li>
        </ul>
      </div>
      <div id="myTabContent">
        {tab.id == "post" && <Post />}
        {tab.id == "followers" && (
          <Followers handle={userProfile.followerMetaData} />
        )}
        {tab.id == "followings" && <Followings handle={userProfile.followingMetaData} />}
      </div>
    </div>
  );
};
export default Profile;
