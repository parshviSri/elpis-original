const { expect} = require("chai");
const { ethers } = require("hardhat");

describe("Create Profile", () => {
  beforeEach("#deploy", async () => {
    [owner, otherAccount] = await ethers.getSigners();
    ElpisNFT = await ethers.getContractFactory("ElpisNFT");
    elpisNFT = await ElpisNFT.deploy();
    await elpisNFT.deployed();
    Elpis = await ethers.getContractFactory("Elpis");
    elpis = await Elpis.deploy(elpisNFT.address);
    await elpis.deployed();
  });

  describe("# profile already exists", () => {
    it("Should revert if the user has already a profile", async () => {
      let user = {
        name: "user1",
        handle: "user1",
        bio: "bio of user1",
        profileImageUrl: "imageUrl",
        coverImageUrl: "imageUrl",
        tokenUri: "tokenUri",
      };
       await elpis.createProfile(user.name,user.handle,user.bio,user.profileImageUrl,user.coverImageUrl,user.tokenUri);
      let user2 = {
        name: "user1",
        handle: "user1",
        bio: "bio of user1",
        profileImageUrl: "imageUrl",
        coverImageUrl: "imageUrl",
        tokenUri: "tokenUri",
      };
       await expect(
         elpis.createProfile(
           user2.name,
           user2.handle,
           user2.bio,
           user2.profileImageUrl,
           user2.coverImageUrl,
           user2.tokenUri
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
        tokenUri: "tokenUri",
      };
      const trans = await elpis.createProfile(
        user.name,
        user.handle,
        user.bio,
        user.profileImageUrl,
        user.coverImageUrl,
        user.tokenUri
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
        tokenUri: "tokenUri",
      };
      await expect(
        elpis.createProfile(
          user.name,
          user.handle,
          user.bio,
          user.profileImageUrl,
          user.coverImageUrl,
          user.tokenUri
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
       expect(await elpis.getTotalUser()).to.equal(1);
    })
  })
});


