import { useRouter } from "next/router";

const Card = (props) => {
  console.log(props);
  let user = {
    name:"",
    handle:"",
    bio:"",
    followers:"",
    following:"",
    publications:"",
    profileImageUrl:"",
    coverImageUrl:"",
  };
  if(props.profile){
    user = {
      name: props?.profile?.name,
      handle: props.profile.handle,
      bio: props.profile.bio,
      followers: props.profile.follwerCount,
      following: props.profile.followingCount,
      publications: props.profile.postCount,
      profileImageUrl: props.profile.profileImageUrl,
      coverImageUrl: props.profile.coverImageUrl,
    };
  }
  
  const router = useRouter();
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg text-center bg-white"
      onClick={() => {
        router.push({ pathname: "/dashboard", query: { id: user.handle } });
      }}
    >
      <div className="py-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-6/12 sm:w-4/12 px-4">
            <img
              src={user.profileImageUrl}
              alt="..."
              className="shadow rounded-full max-w-full h-auto align-middle border-none"
            />
          </div>
        </div>
        <div className="font-bold text-xl mb-2">{user.name}</div>
        <div className="text-m mb-2">{user.handle}</div>

        <p className="text-gray-700 text-base">{user.bio}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Followers{user.followers}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Following{user.following}
        </span>
      </div>
    </div>
  );
};
export default Card;
