import { useRouter } from "next/router";
import { addFile } from "../../../ipfs-utils";
import { useState } from "react";
import { getAccount, connectContract } from "../../../ether-utils";
const SignUp = () => {
  const router = useRouter();

  const [userReg, setUserReg] = useState({
    name: "",
    handle: "",
    bio: "",
    profileImageUrl: "/noImage.png",
    coverImageUrl: "/DefaultBackground.png",
  });


  const addProfileImage = async(e) => {
    let profileImage = await addFile(e.target.files[0]);
    setUserReg({ ...userReg, profileImageUrl: profileImage });
  };


  const addCoverImage = async(e) => {
    let coverImage = await addFile(e.target.files[0]);
    setUserReg({ ...userReg, coverImageUrl: coverImage });
  };

  const createProfile = async () => {
    try {
      const address= await getAccount();
      const elpis = await connectContract();
      let trans = await elpis.createProfile(
        userReg.name,
        userReg.handle,
        userReg.bio,
        userReg.profileImageUrl,
        userReg.coverImageUrl
      );
      await trans.wait();
      const event = await elpis.on("ProfileCreated",(_profilehandle, _address)=>{
      router.push({ pathname: "/dashboard", query: { id: userReg.handle } });
      });
    } catch (err) {
    }
  };

  return (
    <div className="container bg-[#09132e]">
      <div className="flex flex-row">
        <div className="basis-1/2 text-center p-6 m-auto">
          <div className="w-full max-w-xl">
            <p className="text-white-500 text-4xl">
              {" "}
              Join the new way of Social Media just with your wallet
            </p>
            <p className="text-gray-500">
              Currently only supports Polygon Mumbai testnet
            </p>
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* cover photo is added */}
              <div>
                <img
                  className="object-fill h-48 w-full"
                  src={userReg.coverImageUrl}
                  alt="Default cover image "
                />
                <input
                  type="file"
                  className="hidden text-sm text-grey-500 file:bg-[#03132e] px-6"
                  id="coverImage"
                  onChange={addCoverImage}
                />
                <label htmlFor="coverImage">Add Your Cover </label>
              </div>
              {/* profile image is added */}
              <div className="flex flex-wrap justify-center">
                <div className="w-6/12 sm:w-4/12 px-4">
                  <img
                    src={userReg.profileImageUrl}
                    alt="..."
                    className="shadow rounded-full max-w-full h-auto align-middle border-none"
                  />
                  <input
                    type="file"
                    className="hidden text-sm text-grey-500 file:bg-[#03132e]"
                    id="profileNFT"
                    onChange={addProfileImage}
                  />
                  <label htmlFor="profileNFT">Add Your Profile </label>
                </div>
              </div>
              {/* user name is added */}
              <div className="mb-4">
                <input
                  className="bg-[#03132e] shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Your Name"
                  onChange={(event) => {
                    setUserReg({ ...userReg, name: event.target.value });
                  }}
                />
              </div>
              {/* user handle is added */}
              <div className="mb-4">
                <input
                  className="bg-[#03132e] shadow appearance-none border rounded w-full py-2 px-3 text-white-700 focus:border-blue-500 focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Your Handle"
                  onChange={(event) => {
                    setUserReg({ ...userReg, handle: event.target.value });
                  }}
                />
              </div>
              {/* bio */}
              <div className="mb-4">
                <textarea
                  className="
                          bg-[#03132e] 
                          shadow 
                          appearance-none
                          w-full
                          px-3
                          py-2
                          border 
                          rounded
                          text-white-700 
                          focus:border-blue-500 focus:outline-none
                          "
                  placeholder="Your Bio"
                  onChange={(event) => {
                    setUserReg({ ...userReg, bio: event.target.value });
                  }}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={createProfile}
                >
                  Create Your Profile
                </button>
                <a
                  className="inline-block align-baseline font-bold text-m text-blue-500 hover:text-blue-800"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  Need a wallet?
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="basis-1/2">
          <div>
            <button className="ml-14">Go Back to home</button>
          </div>
          <div className="flex justify-center">
            <img src="/introduction.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
