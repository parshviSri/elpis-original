const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("one profile can follow the other profile", () => {
  beforeEach("#deploy", async () => {
   [owner, otherAccount] = await ethers.getSigners();
   ElpisNFT = await ethers.getContractFactory("ElpisNFT");
   elpisNFT = await ElpisNFT.deploy();
   await elpisNFT.deployed();
   Elpis = await ethers.getContractFactory("Elpis");
   elpis = await Elpis.deploy(elpisNFT.address);
   await elpis.deployed();
  });
  describe("#success", () => {
    it("should emit event FollowProfile", async () => {
      let user1 = {
        name: "user1",
        handle: "user1",
        bio: "bio of user1",
        profileImageUrl: "imageUrl",
        coverImageUrl: "imageUrl",
        tokenUri: "tokenUri",
      };
      await elpis.createProfile(
        user1.name,
        user1.handle,
        user1.bio,
        user1.profileImageUrl,
        user1.coverImageUrl,
        user1.tokenUri
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
      let _followerMetaData = "_followerMetaData";
      let _follwerTokenUri = "_follwerTokenUri";
      let _followingMetaData = "_followingMetaData";
      let _followingTokenUri = "_followingTokenUri";
      await expect(elpis.connect(otherAccount).allowFollow(user1.handle));

      await expect(
        elpis
          .connect(otherAccount)
          .followProfile(user1.handle, _followerMetaData, _followingMetaData)
      )
        .to.emit(elpis, "StartedFollowing")
        .withArgs(user2.handle, user1.handle);
    });
    it("increase in the follwer count", async()=>{
       let user1 = {
         name: "user1",
         handle: "user1",
         bio: "bio of user1",
         profileImageUrl: "imageUrl",
         coverImageUrl: "imageUrl",
         tokenUri:"tokenUri"
       };
       await elpis.createProfile(
         user1.name,
         user1.handle,
         user1.bio,
         user1.profileImageUrl,
         user1.coverImageUrl,
         user1.tokenUri
       );

       let user2 = {
         name: "user2",
         handle: "user2",
         bio: "bio of user2",
         profileImageUrl: "imageUrl",
         coverImageUrl: "imageUrl",
         tokenUri: "tokenUri"
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
        let _followerMetaData = "_followerMetaData";
        let _follwerTokenUri = "_follwerTokenUri";
        let _followingMetaData = "_followingMetaData";
        let _followingTokenUri = "_followingTokenUri";
        await elpis.connect(otherAccount).allowFollow(user1.handle);
         await elpis
           .connect(otherAccount)
           .followProfile(
             user1.handle,
             _followerMetaData,
             _followingMetaData
           );
        let trans2 = await elpis.getProfile();
        expect(trans2.followerCount).to.equal(1);
    });
    it("increase in the follwing count", async () => {
      let user1 = {
        name: "user1",
        handle: "user1",
        bio: "bio of user1",
        profileImageUrl: "imageUrl",
        coverImageUrl: "imageUrl",
        tokenUri: "tokenUri",
      };
      await elpis.createProfile(
        user1.name,
        user1.handle,
        user1.bio,
        user1.profileImageUrl,
        user1.coverImageUrl,
        user1.tokenUri
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
      let _followerMetaData = "_followerMetaData";
      let _follwerTokenUri = "_follwerTokenUri";
      let _followingMetaData = "_followingMetaData";
      let _followingTokenUri = "_followingTokenUri";
      await elpis.connect(otherAccount).allowFollow(user1.handle);
      await elpis
        .connect(otherAccount)
        .followProfile(
          user1.handle,
          _followerMetaData,
          _followingMetaData
        );
      let trans2 = await elpis.connect(otherAccount).getProfile();
      expect(trans2.followingCount).to.equal(1);
    });
   
  });
});