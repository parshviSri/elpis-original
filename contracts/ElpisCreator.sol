// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract CreatorToken is ERC1155, Ownable {
    constructor() ERC1155("") {
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
     function mintCreatorToken(uint256 profileId) public{
         _mint(msg.sender,profileId,100,"");

         setApprovalForAll(address(this),true);
         
     }
     function getCreatorToken(uint256 profileId, address profileAddress) public{
        

         ERC1155(address(this)).safeTransferFrom(profileAddress,msg.sender,profileId,1," ");
     }
     function getBalance(uint256 _tokenId) public view returns(uint256){
         uint256 _balance=balanceOf(msg.sender,_tokenId);
         return _balance;
     }
    //  function mintNFT(uint256 newtokenId)external virtual returns(uint256){

    //     _mint(msg.sender, newtokenId,1,"");
    //     return newtokenId;
    
    // }

}