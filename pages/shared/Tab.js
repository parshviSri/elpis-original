import { useState } from "react";
import Post from "../components/profile/post";
import Followers from "../components/profile/followers";
import Followings from "../components/profile/followings";
const Tab = (props) => {

  let profilePage = props.profile;
  const profilePagefollower = parseInt(profilePage?.followerCount._hex);
  const profilePagefollowing = parseInt(profilePage?.followingCount._hex);
  const profilePagepost = parseInt(profilePage?.postCount._hex);
  const [tab, setTab] = useState({
    id: "post",
    activeClass:
      "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
  });
  const updateTab = (e) =>{
            setTab({
                activeClass: "inline-block p-4 rounded-t-lg border-b-2",

                  id: e.target.value,
                });
              }
  
  return (
    <div>
      {/* tabs Info */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="basis-1/4" role="presentation">
            <button
              className={tab.id == "post" && tab.activeClass}
              value="post"
              onClick={updateTab}
            >
              Post:{profilePagepost}
            </button>
          </li>
          <li className="basis-1/4" role="presentation">
            <button
              className={tab.id == "followers" && tab.activeClass}
              value="followers"
              onClick={updateTab}
            >
              Followers:{profilePagefollower}
            </button>
          </li>
          <li className="basis-1/4" role="presentation">
            <button
              className={tab.id == "followings" && tab.activeClass}
              value="followings"
              onClick={updateTab}
            >
              Followings:{profilePagefollowing}
            </button>
          </li>
        </ul>
      </div>
      <div id="myTabContent">
        {tab.id == "post" && (
          <Post
            profile={profilePage?.name}
            metaData={profilePage?.postMetaData}
          />
        )}
        {tab.id == "followers" && (
          <Followers
            profile={profilePage?.name}
            metaData={profilePage?.followerMetaData}
          />
        )}
        {tab.id == "followings" && (
          <Followings
            profile={profilePage?.name}
            metaData={profilePage?.followingMetaData}
          />
        )}
      </div>
    </div>
  );
};
export default Tab;
