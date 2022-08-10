import { useState , useEffect} from "react";
import { addFile } from "../../../ipfs-utils";
import { connectContract } from "../../../ether-utils";
import axios from 'axios';
import { encrypt } from "../../../lit-utils";

import PostCard from "../../shared/PostCard";
const Post= (props) =>{
    console.log(props.profile);
    const[showAdd, setShowAdd]= useState(false);
    const[newpost,setPost] = useState({
        description:'',
        image:'',
        imageFlag:false
    });
    const[oldPosts,setOldPosts]= useState([]);
    useEffect(()=>{
        if (props.metadata) {
          console.log(props.metadata);
          showPost();
        }
    },[])
    const addPost = async() =>{
        let elpis = await connectContract();
        let today = new Date().toLocaleDateString("en-US", {
          month: "short",
          day:"numeric"
        });
        let posts;
        let post={
            description:newpost.description,
            image:newpost.image,
            likes:0,
            comments:[],
            date:today
        }
        if (props.metadata) {
          posts = props.metadata;
          console.log(posts);
          posts.push(post);
        } else {
          posts = [post];
        }
        //encrypt your post
        const { encryptedString, encryptedSymmetricKey } = await encrypt(
          JSON.stringify(posts),
          props.profile.tokenId
        );
        let contentJson = {
          encryptedSymmetricKey,
          message: await addFile(encryptedString),
        };
        let upadatedPostMetaData = await addFile(JSON.stringify(contentJson));
        await elpis.addPost(upadatedPostMetaData);
        let event = await elpis.on("PostCreated",(handle,postCount)=>{
            console.log("handle,postCount", handle, postCount);
        });

        
    
    };
    const addPostImage = async(e) =>{
        let postImage = await addFile(e.target.files[0])
        setPost({...newpost,image:postImage,imageFlag:true});
    };
    const showPost= async()=>{        
            let posts = props.metadata;
            console.log(posts);
            setOldPosts( [posts]);
        
    }
    return (
      <div>
        {showAdd || (
          <button
            onClick={() => {
              setShowAdd(true);
            }}
          >
            Add Post
          </button>
        )}
        {showAdd && (
          <form className="shadow-md rounded w-96">
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
                placeholder="Add your thoughts.."
                onChange={(e) => {
                  setPost({ ...newpost, description: e.target.value });
                }}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <div>
                {newpost.imageFlag && <img src={newpost.image} />}
                <input
                  type="file"
                  className="hidden"
                  id="postImage"
                  onChange={addPostImage}
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
                onClick={addPost}
              >
                Add Your Post
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  setPost({ description: "", image: "", imageFlag: false });
                  setShowAdd(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {oldPosts.length > 0 &&
          oldPosts.map((oldpost,i) => {
            return (
              <PostCard key={i} post={oldpost} index={i}/>
            );
          })}
      </div>
    );
}

export default Post;