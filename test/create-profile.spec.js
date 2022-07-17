const { expect} = require("chai");
const { ethers } = require("hardhat");

describe("Create Profile", () => {
  beforeEach("#deploy", async () => {
     [owner, otherAccount] = await ethers.getSigners();

    Elpis = await ethers.getContractFactory("Elpis");
     elpis = await Elpis.deploy();
    await elpis.deployed();
  });

  describe("# profile already exists", () => {
    it("Should revert if the user has already a profile", async () => {
      let user = {
        name: "user1",
        handle: "user1",
        bio: "bio of user1",
        profileImageUrl: "imageUrl",
        coverImageUrl: "imageUrl"
      };
       await elpis.createProfile(user.name,user.handle,user.bio,user.profileImageUrl,user.coverImageUrl);
      let user2 = {
        name: "user1",
        handle: "user1",
        bio: "bio of user1",
        profileImageUrl: "imageUrl",
        coverImageUrl: "imageUrl"
      };
       await expect(
         elpis.createProfile(
           user2.name,
           user2.handle,
           user2.bio,
           user2.profileImageUrl,
           user2.coverImageUrl
         )
       ).to.be.revertedWith("Profile  exists!!");
    });
    it("checks if the handle is already present ",async()=>{
      let user = {
        name: "user1",
        handle: "user1",
        bio: "bio of user1",
        profileImageUrl: "imageUrl",
        coverImageUrl: "imageUrl",
      };
      const trans = await elpis.createProfile(
        user.name,
        user.handle,
        user.bio,
        user.profileImageUrl,
        user.coverImageUrl
      );
       expect(await elpis.isHandleExist(user.handle)).to.equal(true);
    })
  });
  describe('#success',()=>{
    it("Should emit profile creation event",async()=>{
      let user = {
        name: "user1",
        handle: "user1",
        bio: "bio of user1",
        profileImageUrl: "imageUrl",
        coverImageUrl: "imageUrl",
      };
      await expect(
        elpis.createProfile(
          user.name,
          user.handle,
          user.bio,
          user.profileImageUrl,
          user.coverImageUrl
        )
      ).to.emit(elpis, "ProfileCreated").withArgs(user.handle,owner.address);
    })
    it("Should increase the total no of users", async()=>{
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
       expect(await elpis.getTotalUser()).to.equal(1);
    })
  })
});


