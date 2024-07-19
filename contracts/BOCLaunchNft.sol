// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
import "base64-sol/base64.sol";

contract BOC_NFT_Basic is ERC721URIStorage, Ownable {
    address public artist;
    address public txFeeToken;
    uint public txFeeAmount;
    uint256 public tokenCounter;
    event CreatedSVGNFT(uint256 indexed tokenId, string tokenURI);

    constructor(
    address _artist,
    address _txFeeToken,
    uint _txFeeAmount) ERC721("Bank of Cronos Initial NFT Offering", "bocNFT")
    {
        tokenCounter = 0;
        artist = _artist;
        txFeeToken = _txFeeToken;
        txFeeAmount = _txFeeAmount;
    }

    function create() public {
        require(tokenCounter < 10000);
        _payTxFee(msg.sender);
        _safeMint(msg.sender, tokenCounter);
        string memory imageURI = 'ipfs://QmT4H82tt9wbDgfKFGf767CWuemX7KEdcdPFB6WGhg3Dkc';
        _setTokenURI(tokenCounter, formatTokenURI(imageURI,tokenCounter));
        emit CreatedSVGNFT(tokenCounter,formatTokenURI(imageURI,tokenCounter));
        tokenCounter = tokenCounter + 1;
    }


    function formatTokenURI(string memory imageURI, uint256 _tokenCounter) public pure returns (string memory) {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                "Bank Of Cronos Initial NFT Offering", // You can add whatever name here
                                '", "description":"The Official Bank of Cronos Initial NFT Offering", "Edition":"',Strings.toString(_tokenCounter),'", "image":"',imageURI,'"}'
                            )
                        )
                    )
                )
            );
    }



    function _payTxFee(address from) internal {
    IERC20 token = IERC20(txFeeToken);
    token.transferFrom(from, artist, txFeeAmount);
  }
}
