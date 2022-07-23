// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract ElpisNFT is ERC721URIStorage{
    constructor()ERC721("ElpisProfile","ELP"){}

    function mint(uint256 newtokenId,string memory _tokenUri)external virtual returns(uint256){

        _mint(msg.sender, newtokenId);
        _setTokenURI(newtokenId,_tokenUri);
        return newtokenId;
    
    }
    function setTokenUri(uint256 tokenId,string memory _tokenUri) external virtual{

        _setTokenURI(tokenId, _tokenUri);

    }
    function getTokenUri(uint256 tokenId) external virtual returns(string memory){
        return tokenURI(tokenId);
    }
 }