// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// errors
error DogPunks__withdrawFailed();

// 0x78e33047be5BFFf23338381978AADD445EF8322E
contract DogPunks is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    string public s_tokenExtension = ".json";
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string public baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() ERC721("DogPunks", "DPS") {
        mintPrice = 0.01 ether;
        totalSupply = 0;
        maxSupply = 10000;
        maxPerWallet = 3;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled)
        external
        onlyOwner
    {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _tokenUri) external onlyOwner {
        baseTokenUri = _tokenUri;
    }

    function tokenURI(uint tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token Uri does not exist");
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(tokenId),
                    s_tokenExtension
                )
            );
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "your balance is 0");
        (bool sent, ) = withdrawWallet.call{value: balance}("");
        if (!sent) {
            revert DogPunks__withdrawFailed();
        }
    }

    function mint(uint256 quantity) public payable {
        require(isPublicMintEnabled, "Minting is not enabled.");
        require(msg.value == quantity * mintPrice, "Wrong mint value.");
        require(totalSupply + quantity < maxSupply, "We sold out.");
        require(
            walletMints[msg.sender] + quantity < maxPerWallet,
            "exceed max wallet."
        );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
