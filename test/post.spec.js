const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Post",()=>{
    beforeEach("#deploy",async()=>{
        [owner, otherAccount] = await ethers.getSigners();

        Elpis = await ethers.getContractFactory("Elpis");
        elpis = await Elpis.deploy();
        await elpis.deployed();
    });
    describe("#success",()=>{
     describe("Post is created", () => {
       it("Should emit Post created event", async () => {
         let user = {
           name: "user1",
           handle: "user1",
           bio: "bio of user1",
           profileImageUrl: "imageUrl",
           coverImageUrl: "imageUrl",
         };
         await elpis.createProfile(
           user.name,
           user.handle,
           user.bio,
           user.profileImageUrl,
           user.coverImageUrl
         );
         await expect(elpis.addPost("postMetaData"))
           .to.emit(elpis, "PostCreated")
           .withArgs(user.handle, 1);
       });
     });
     describe("post count should update", async()=>{
        it("should increase the number of post count", async()=>{
          let user = {
            name: "user1",
            handle: "user1",
            bio: "bio of user1",
            profileImageUrl: "imageUrl",
            coverImageUrl: "imageUrl",
          };
          await elpis.createProfile(
            user.name,
            user.handle,
            user.bio,
            user.profileImageUrl,
            user.coverImageUrl
          );
          await elpis.addPost("postMetaData");
          let profile = await elpis.getProfile();
          expect(profile.postCount).to.equal(1);
        })
     }) 
     describe("post is interacted",()=>{
      it("emit Post Interaction event whenever someone comment or likes the post",async()=>{
        let user = {
          name: "user1",
          handle: "user1",
          bio: "bio of user1",
          profileImageUrl: "imageUrl",
          coverImageUrl: "imageUrl",
        };
        await elpis.createProfile(
          user.name,
          user.handle,
          user.bio,
          user.profileImageUrl,
          user.coverImageUrl
        );
        await elpis.addPost("postMetaData");
        await expect(
          elpis
            .connect(otherAccount)
            .addCommentAndLikes(user.handle,"postMetaDataWithComments")
        ).to.emit(elpis, "PostInteraction").withArgs(user.handle);
      })
     })  
    })
    
})