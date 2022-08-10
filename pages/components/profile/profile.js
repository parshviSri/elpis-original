import {connectContract } from "../../../ether-utils";
import { useRouter } from "next/router";
import {useState,useEffect } from "react";
import Tab from "../../shared/Tab";
import FollowButton from "../../shared/FollowButton";
import CheckToken from './checkToken';
const Profile = (props) => {
  let [metaData,setMetaData]= useState();
  useEffect(() => {
    encrptData();
  }, [props.profile]);
    const router = useRouter();
    let profilePage= props.profile;
    console.log(profilePage);
    const [searchId, setSearchId] = useState("");
      const search = async () => {
    let elpis = await connectContract();
    let trans = await elpis.searchProfile(searchId);
    router.push({ pathname: "/dashboard", query: { id: trans.handle } });


  };
  const encrptData = async()=>{
    console.log('in encrypedData');
    let profileMetaData=await CheckToken(props.profile);
    console.log(profileMetaData);
    setMetaData(profileMetaData);
  }

  return (
    <div>
      {/* search bar */}
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
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
          ></svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search other profiles"
          required
          onChange={(e) => {
            setSearchId(e.target.value);
          }}
        />
        <button
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={search}
        >
          Search
        </button>
      </div>
      {/* profile basic info */}
      <div>
        <img
          className="object-fill h-48 w-full"
          src={profilePage?.coverImageUrl || "/DefaultBackground.png"}
          alt="Cover Image"
        />
        <div className=" flex w-3/12 sm:w-4/12 px-4">
          <img
            src={profilePage?.profileImageUrl || "/noImage.png"}
            alt="..."
            className="shadow rounded-full max-w-48 h-28 align-middle border-none"
          />
          <div>
            <p className="text-bold text-4xl border-b">{profilePage?.name}</p>
            <p className="text-2xl px-2">{profilePage?.handle}</p>
          </div>
          {/* Follow Button will come here */}
          <div className="ml-8 px-2 py-4">
            <FollowButton profile={props.profile}/>
          </div>
        </div>
        <div className="mt-2 p-2 px-5 border-b">
          <p>{profilePage?.bio || "Your Bio will come here a long sentences"}</p>
        </div>
      </div>
      <Tab profile={props.profile} metadata= {metaData}/>
    </div>
  );
};
export default Profile;
