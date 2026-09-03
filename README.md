# 🃏 Elemental Beasts Marketplace

A decentralized game card marketplace built on the Ethereum Sepolia testnet 

Elemental Beasts allows users to mint unique NFT game cards, list them for sale, purchase cards from other users, and view the cards owned by their connected wallet.

---

## 📖 Project Overview

**Elemental Beasts Marketplace** is a decentralized NFT-based game card marketplace.

Each game card represents a unique elemental creature with:

- A unique NFT token ID
- Card artwork
- Name
- Description
- Element/type
- Rarity
- Metadata stored on IPFS

Users can interact with the marketplace directly through their MetaMask wallet on the **Ethereum Sepolia testnet**.

The project demonstrates the core functionality of a decentralized NFT marketplace, including minting, listing, buying, wallet connection, IPFS storage, and ownership tracking.

---

## ✨ Features

### 🃏 Mint Game Cards

Users can mint unique game cards as ERC-721 NFTs.

Each minted card contains:

- Unique token ID
- Name
- Description
- Image
- Element/type
- Rarity
- IPFS metadata URI

---

### 🏷️ List Cards for Sale

Users who own a card can list it on the marketplace by specifying a price in ETH.

The listing is recorded on the blockchain.

---

### 💰 Buy Listed Cards

Users can purchase cards listed by other users.

After a successful purchase:

- ETH is transferred to the seller
- NFT ownership is transferred to the buyer
- The marketplace listing is updated
- The frontend refreshes the displayed ownership information

Users are prevented from purchasing their own listed cards.

---

### 🔗 Connect MetaMask Wallet

The application connects to MetaMask using `ethers.js`.

The application:

- Connects the user's wallet
- Detects account changes
- Checks the connected network
- Requires the Ethereum Sepolia testnet
- Allows users to interact directly with the smart contract

---

### 🖼️ Marketplace Gallery

The marketplace displays available cards in a visual gallery.

Each card displays information such as:

- Card image
- Token ID
- Name
- Element
- Rarity
- Description
- Listing price
- Buy option

---

### 👤 My Cards

The **My Cards** section displays the game cards currently owned by the connected wallet.

Users can view their owned cards and list eligible cards for sale.

---

### 🧪 Smart Contract Testing

The project includes automated tests for the core marketplace functionality.

Tests cover important scenarios involving:

- Minting
- Token ID assignment
- Token URI storage
- Listing
- Ownership validation
- Price validation
- Buying
- Payment
- Insufficient funds
- Unlisted cards
- Self-purchase prevention
- Excess ETH handling
- Listing cancellation

---

## 🎮 Game Cards

The project currently contains **8 unique game cards**.

| Card | Name | Element / Type | Rarity |
|---|---|---|---|
| Card 1 | Emberfang | Fire | Common |
| Card 2 | Tidalclaw | Water | Common |
| Card 3 | Rootling | Earth | Common |
| Card 4 | Galevane | Air | Uncommon |
| Card 5 | Cinderjaw | Fire | Uncommon |
| Card 6 | Abyssara | Water | Rare |
| Card 7 | Terravox | Earth | Rare |
| Card 8 | Aetherion | Convergence | Legendary |

The card artwork and metadata are stored using IPFS.

---

# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Styling | Tailwind CSS + Custom CSS |
| Blockchain Interaction | ethers.js v6 |
| Smart Contract | Solidity `^0.8.24` |
| NFT Standard | ERC-721 |
| Smart Contract Framework | Hardhat |
| Contract Libraries | OpenZeppelin |
| Testnet | Ethereum Sepolia |
| Decentralized Storage | IPFS |
| IPFS Service | Pinata |
| Wallet | MetaMask |
| Testing | Hardhat + Mocha/Chai |
| Sepolia ETH | Google Cloud Web3 |

---

# 📁 Project Structure

```text
game-card-marketplace/
│
├── contracts/
│   └── GameCardMarketplace.sol
│
├── test/
│   └── GameCardMarketplace.test.js
│
├── scripts/
│   ├── deploy.js
│   └── uploadToIPFS.js
│
├── metadata/
│   ├── card1.json
│   ├── card2.json
│   ├── card3.json
│   ├── card4.json
│   ├── card5.json
│   ├── card6.json
│   ├── card7.json
│   ├── card8.json
│   └── uploaded.json
│
├── images/
│   ├── card1.png
│   ├── card2.png
│   ├── card3.png
│   ├── card4.png
│   ├── card5.png
│   ├── card6.png
│   ├── card7.png
│   └── card8.png
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnect.jsx
│   │   │   ├── MintCard.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── MyCards.jsx
│   │   │   └── CardTile.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── useWallet.js
│   │   ├── cardUtils.js
│   │   ├── contractConfig.js
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── SCREEN_SHOTS/
│   ├── 01_Project_DEMO/
│   ├── Complete_Process/
│   └── screenshot_HTML/
│
├── hardhat.config.js
├── package.json
├── .env
└── README.md