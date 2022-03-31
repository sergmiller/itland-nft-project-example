// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract ItlandNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    uint256 public constant maxSupply = 10;

    Counters.Counter private _tokenCount;

    constructor(string memory _title, string memory _moto)
        ERC721(_title, _moto)
    {}

    function widthdraw(address _address, uint256 amount) public payable onlyOwner {
        payable(_address).transfer(amount);
    }

    function mint(string memory _tokenURI) public payable onlyOwner {
        uint256 newTokenId = _tokenCount.current();
        require(newTokenId < maxSupply);
         _tokenCount.increment();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
    }
}
