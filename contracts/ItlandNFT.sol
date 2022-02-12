// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract ItlandNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    uint256 public constant maxSupply = 10;
    uint256 public constant mintPrice = 0.01 ether;

    Counters.Counter private _tokenCount;

    constructor()
        ERC721("Itland Cats NFT", "ITLANDCATS")
    {}

    modifier costs(uint price) {
        if (msg.sender != owner()) {
            require(msg.value >= mintPrice, "msg.value should be more or equal than price");
        }
        _;
    }

    function widthdraw(address _address, uint256 amount) public payable onlyOwner {
        payable(_address).transfer(amount);
    }

    function mint(string memory _tokenURI) public payable costs(mintPrice) {
        uint256 newTokenId = _tokenCount.current();
        require(newTokenId < maxSupply);
         _tokenCount.increment();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
    }
}