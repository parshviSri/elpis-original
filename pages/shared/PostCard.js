import { useState,useEffect } from "react";
import { connectContract } from "../../ether-utils";
import { addFile } from "../../ipfs-utils";
import { useRouter } from "next/router";
const PostCard = (porps) =>{
    console.log(porps.post?.comments);
    const router = useRouter();
    const{id} = router.query;
    const [showComment,setShowComment] = useState(false);
    const[comment,setComment]  = useState({
        handleName:'',
        commentername:'',
        description:'',
        profileImage:'',
        image:'',
        imageFlag:false,
        likes:0,
        comments:[]
    });
    const[postProfile,setPostProfile] = useState(null);
    const [commenterProfile,setCommenterProfile] = useState(null);
    useEffect(()=>{
        getPostProfile();
        getProfile();
    },[]);
    const getPostProfile = async()=>{
        let elpis = await connectContract();
        let _postProfile = await elpis.searchProfile(id);
        setPostProfile(_postProfile);
        console.log(postProfile);
    }
    const getProfile = async () => {
      let elpis = await connectContract();
      let profile = await elpis.getProfile();
        setCommenterProfile(profile);
    };
    const addCommentImage = async(e)=>{
        let commentImage = await addFile(e.target.files[0]);
        setComment({ ...comment, image: commentImage, imageFlag: true });
    }
    const addComment = async()=>{
        console.log(commenterProfile);
        setComment({
          ...comment,
          commentername: commenterProfile.name,
          profileImage: commenterProfile.profileImageUrl,
          handleName: commenterProfile.handle,
        });
        let newPost= porps?.post;
        console.log(comment);
        newPost?.comments?.push(comment);
        let url = await addFile(JSON.stringify(newPost));
        console.log(url);
        let elpis = await connectContract();
       await elpis.addCommentAndLikes(postProfile.handle, url);
       let event = await elpis.on("PostInteraction", (handle) => {
         console.log("handle", handle);
       });
    }
    return (
      <div className="max-w-sm max-h-sm">
        <div className="rounded overflow-hidden shadow-lg bg-[#03132e] text-center">
          <div className=" flex py-2">
            <img
              src={postProfile?.profileImageUrl || "/noImage.png"}
              alt="..."
              className="shadow rounded-full max-w-16 h-16 align-middle border-none"
            />
            <div className="px-3">
              <p>{postProfile && postProfile.name}</p>
              <p className="text-gray-500">
                {postProfile && postProfile.handle}
              </p>
            </div>
          </div>
          <div className="px-6 py-2">
            <p className="text-white text-base">{porps?.post?.description}</p>
          </div>
          <div className="flex flex-wrap justify-center">
            {porps?.post?.image && (
              <img
                className="w-64 h-64 flex justify-center"
                src={porps?.post?.image}
                alt="post Image"
              />
            )}
          </div>

          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  console.log(showComment);
                  setShowComment(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            {showComment && (
              <form className="shadow-md rounded w-96">
                {/* comment */}
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
                    placeholder="Add your thoughts.."
                    onChange={(e) => {
                      setComment({ ...comment, description: e.target.value });
                    }}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {comment.imageFlag && <img src={comment.image} />}
                    <input
                      type="file"
                      className="hidden"
                      id="postImage"
                      onChange={addCommentImage}
                    />
                    <label htmlFor="postImage">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={addComment}
                  >
                    Add Your Comment
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => {
                      setComment({
                        description: "",
                        image: "",
                        imageFlag: false,
                      });
                      setShowComment(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
          <div>
            {showComment &&
              porps?.post?.comments?.map((comment,i) => {
                return (<div key={i}className=" flex py-2">
                  <img
                    src={comment?.profileImage || "/noImage.png"}
                    alt="..."
                    className="shadow rounded-full max-w-16 h-16 align-middle border-none"
                  />
                  <div className="px-3">
                    <p>{comment?.commentername}</p>
                    <p className="text-gray-500">{comment.handle}</p>
                    <p>{comment?.description}</p>
                  </div>
                </div>);
              })}
          </div>
        </div>
      </div>
    );
};
export default PostCard