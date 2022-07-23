const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Get profile",()=>{
    beforeEach("#deploy", async()=>{
        [owner, otherAccount] = await ethers.getSigners();

        Elpis = await ethers.getContractFactory("Elpis");
        elpis = await Elpis.deploy();
        await elpis.deployed();
    });
    describe("Get profile by address",()=>{
        describe("#reverts",()=>{
        it("should be reverted if the profile does not exist", async ()=>{
     await expect(elpis.getProfile()).to.be.revertedWith(
       "Profile does not exist!!"
     );
        });
    });
    describe("#success",()=>{
        it("should return the user details", async () =>{
            let user = {
              name: "user1",
              handle: "user1",
              bio: "bio of user1",
              profileImageUrl: "imageUrl",
              coverImageUrl: "imageUrl",
              tokenUri:"tokenUri"
            };
            await elpis.createProfile(
              user.name,
              user.handle,
              user.bio,
              user.profileImageUrl,
              user.coverImageUrl,
              user.tokenUri
            );
        let trans = await elpis.getProfile();
         expect(trans.handle).to.equal(user.handle);
        })
    });
    });
    describe("Get profile by profile handle",()=>{
        describe("#reverts",()=>{
            it("should fails if the profile handle does not exsist", async()=>{
                await expect(elpis.searchProfile("user1")).to.be.revertedWith(
                  "Profile does not exist!!"
                );
            })
        });
        describe("#success",()=>{
            it("should return the user profile", async()=>{
               let user = {
                 name: "user1",
                 handle: "user1",
                 bio: "bio of user1",
                 profileImageUrl: "imageUrl",
                 coverImageUrl: "imageUrl",
                 tokenUri: "tokenUri",
               };
               await elpis.createProfile(
                 user.name,
                 user.handle,
                 user.bio,
                 user.profileImageUrl,
                 user.coverImageUrl,
                 user.tokenUri
               );
               let user2 = {
                 name: "user2",
                 handle: "user2",
                 bio: "bio of user2",
                 profileImageUrl: "imageUrl",
                 coverImageUrl: "imageUrl",
                 tokenUri: "tokenUri",
               };
               await elpis
                 .connect(otherAccount)
                 .createProfile(
                   user2.name,
                   user2.handle,
                   user2.bio,
                   user2.profileImageUrl,
                   user2.coverImageUrl,
                   user2.tokenUri
                 );
               let trans = await elpis.connect(otherAccount).searchProfile(user.handle);
               expect(trans.handle).to.equal(user.handle); 
            })
        })
    })
    
});

