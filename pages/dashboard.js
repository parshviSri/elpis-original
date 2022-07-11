import SignUp from "./components/profile/signup";
import Profile from "./components/profile/profile";
import Header  from './components/header';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccount, connectContract } from "../ether-utils";
import { profileInterface } from "./interface/profile";
const Dashboard =() =>{
    const router = useRouter();

    const { id } = router.query;
    const[userProfile,setUserProfile]= useState(profileInterface);
    
    useEffect(()=>{
        getProfile();
    },[id]);
    const getProfile= async()=>{
        try{
           const address = await getAccount();
           const elpis = await connectContract();
           console.log(id);
           const profile = await elpis.searchProfile(id);
           setUserProfile(profile);
            router.push({ pathname: "/dashboard", query: { id: id } });

        }
        catch(err){
        console.log(err);
            

        }
    }
    return(
        <div>
            <Header/>
            {id || <SignUp/>}
            {id && <Profile profile={userProfile}/>}
        </div>
    )
}
export default Dashboard