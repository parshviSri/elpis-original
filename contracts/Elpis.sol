// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Elpis {
    struct Profile {
        string name;
        string handle;
        string bio;
        string profileImageUrl;
        string coverImageUrl;
        uint256 followerCount;
        uint256 followingCount;
        uint256 postCount;
        string followerMetaData;
        string followingMetaData;
        string postMetaData;
        bool profileExist;
    }
    mapping(address => Profile) profileAddress;
    mapping(string => address) profileHandle;
    uint256 noOfUser;
    event ProfileCreated(string handle, address indexed user);
    event StartedFollowing(string follwerhandle, string followinghandle);

    function isHandleExist(string memory _handle)
        public
        view
        returns (bool _isHandleExist)
    {
        if (profileHandle[_handle] != address(0x00)) {
            return true;
        }
        return false;
    }

    function createProfile(
        string memory _name,
        string memory _handle,
        string memory _bio,
        string memory _profileImageUrl,
        string memory _coverImageUrl
    ) external returns (string memory userHandle) {
        require(!profileAddress[msg.sender].profileExist, "Profile  exists!!");
        Profile memory _user;
        _user.name = _name;
        _user.handle = _handle;
        _user.bio = _bio;
        _user.profileImageUrl = _profileImageUrl;
        _user.coverImageUrl = _coverImageUrl;
        _user.profileExist = true;
        profileAddress[msg.sender] = _user;
        profileHandle[_handle] = msg.sender;
        noOfUser += 1;
        emit ProfileCreated(_user.handle, msg.sender);
        return _user.handle;
    }

    function getProfile() external view returns (Profile memory _user) {
        require(
            profileAddress[msg.sender].profileExist,
            "Profile does not exist!!"
        );
        return profileAddress[msg.sender];
    }

    function searchProfile(string memory _handle)
        external
        view
        returns (Profile memory _user)
    {
        require(
            profileHandle[_handle] != address(0x00),
            "Profile does not exist!!"
        );
        return profileAddress[profileHandle[_handle]];
    }

    function followProfile(
        string memory _handle,
        string memory _followerMetaData,
        string memory _followingMetaData
    ) external {
        profileAddress[profileHandle[_handle]]
            .followerMetaData = _followerMetaData;
        profileAddress[profileHandle[_handle]].followerCount += 1;
        profileAddress[msg.sender].followingMetaData = _followingMetaData;
        profileAddress[msg.sender].followingCount += 1;
        emit StartedFollowing(profileAddress[msg.sender].handle, _handle);
    }
}
