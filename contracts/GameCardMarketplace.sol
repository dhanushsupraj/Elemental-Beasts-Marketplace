// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Elemental Beasts Card Marketplace
/// @notice Mint unique game-card NFTs, burn owned cards, and trade them
///         in a simple built-in marketplace.
/// @dev Metadata (name, description, image, attributes/rarity) lives off-chain
///      on IPFS, referenced by each token's tokenURI.
///      This contract tracks ownership + price + token metadata.
contract GameCardMarketplace is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _nextTokenId;

    struct Listing {
        address seller;
        uint256 price; // in wei
        bool active;
    }

    // tokenId => listing info
    mapping(uint256 => Listing) public listings;

    event CardMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string tokenURI
    );

    event CardBurned(
        uint256 indexed tokenId,
        address indexed owner
    );

    event CardListed(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );

    event ListingCancelled(
        uint256 indexed tokenId,
        address indexed seller
    );

    event CardSold(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );

    constructor()
        ERC721("Elemental Beasts", "EBEAST")
        Ownable(msg.sender)
    {}

    /// @notice Mint a new game card NFT to the caller.
    /// @param tokenURI_ IPFS URI pointing to the card's metadata JSON.
    /// @return tokenId The ID of the newly minted card.
    function mintCard(
        string memory tokenURI_
    ) external returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        emit CardMinted(
            tokenId,
            msg.sender,
            tokenURI_
        );

        return tokenId;
    }

    /// @notice Burn/destroy an owned game card NFT permanently.
    /// @dev The token ID cannot be reused because _nextTokenId only increases.
    ///      The same metadata/IPFS URI can be minted again as a new token ID.
    function burnCard(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Not the owner of this card"
        );

        // If the card is currently listed, remove its listing first.
        if (listings[tokenId].active) {
            require(
                listings[tokenId].seller == msg.sender,
                "Not the seller of this listing"
            );

            delete listings[tokenId];

            emit ListingCancelled(
                tokenId,
                msg.sender
            );
        }

        emit CardBurned(
            tokenId,
            msg.sender
        );

        _burn(tokenId);
    }

    /// @notice List an owned card for sale at a given price.
    /// @param tokenId The card to list.
    /// @param price Price in wei. Must be greater than zero.
    function listCard(
        uint256 tokenId,
        uint256 price
    ) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Not the owner of this card"
        );

        require(
            price > 0,
            "Price must be greater than zero"
        );

        require(
            !listings[tokenId].active,
            "Card already listed"
        );

        listings[tokenId] = Listing({
            seller: msg.sender,
            price: price,
            active: true
        });

        emit CardListed(
            tokenId,
            msg.sender,
            price
        );
    }

    /// @notice Cancel an active listing you created.
    function cancelListing(
        uint256 tokenId
    ) external {
        Listing memory listing = listings[tokenId];

        require(
            listing.active,
            "Card is not listed"
        );

        require(
            listing.seller == msg.sender,
            "Not the seller of this listing"
        );

        delete listings[tokenId];

        emit ListingCancelled(
            tokenId,
            msg.sender
        );
    }

    /// @notice Buy a listed card by sending exactly its listed price in ETH.
    function buyCard(
        uint256 tokenId
    ) external payable nonReentrant {
        Listing memory listing = listings[tokenId];

        require(
            listing.active,
            "Card is not listed for sale"
        );

        require(
            msg.value >= listing.price,
            "Insufficient ETH sent"
        );

        require(
            ownerOf(tokenId) == listing.seller,
            "Seller no longer owns this card"
        );

        require(
            msg.sender != listing.seller,
            "Cannot buy your own card"
        );

        // Effects before interactions
        delete listings[tokenId];

        // Transfer the NFT to the buyer
        _transfer(
            listing.seller,
            msg.sender,
            tokenId
        );

        // Pay the seller
        (bool sent, ) = payable(listing.seller).call{
            value: listing.price
        }("");

        require(
            sent,
            "Payment to seller failed"
        );

        // Refund any excess ETH sent above the listing price
        if (msg.value > listing.price) {
            (bool refunded, ) = payable(msg.sender).call{
                value: msg.value - listing.price
            }("");

            require(
                refunded,
                "Refund of excess ETH failed"
            );
        }

        emit CardSold(
            tokenId,
            listing.seller,
            msg.sender,
            listing.price
        );
    }

    /// @notice Total number of cards minted so far.
    /// @dev This number does not decrease when a card is burned.
    function totalSupply()
        external
        view
        returns (uint256)
    {
        return _nextTokenId;
    }

    /// @notice Convenience view: is a given token currently listed for sale.
    function isListed(
        uint256 tokenId
    ) external view returns (bool) {
        return listings[tokenId].active;
    }
}