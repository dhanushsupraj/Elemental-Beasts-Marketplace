# 🃏 Elemental Beasts Marketplace

> A decentralized NFT game-card marketplace built on the Ethereum Sepolia testnet.

**Elemental Beasts Marketplace** is a Web3 decentralized application (dApp) that allows users to mint, list, buy, cancel listings, burn, and manage unique elemental creature cards represented as ERC-721 NFTs.

The project combines a **React + Vite frontend**, **Solidity smart contract**, **Hardhat**, **OpenZeppelin**, **ethers.js v6**, **MetaMask**, **Ethereum Sepolia**, and **IPFS/Pinata**.

---

## 🌐 Live Demo

**Live Application:**  
https://elemental-beasts-marketplace.vercel.app/

**GitHub Repository:**  
https://github.com/dhanushsupraj/Elemental-Beasts-Marketplace

**Deployed Smart Contract:**  
https://sepolia.etherscan.io/address/0x20E4B3D85d987c788331d87d4478ecc6377bcF1F

---

## ✨ Features

- 🃏 Mint ERC-721 NFT game cards
- 🏷️ List NFTs for sale
- 💰 Buy listed NFTs using Sepolia ETH
- ❌ Cancel NFT listings
- 🔥 Burn NFTs
- 🦊 MetaMask wallet integration
- ⛓️ Ethereum Sepolia blockchain integration
- 🌐 IPFS/Pinata metadata storage
- 🖼️ NFT marketplace gallery
- 👤 My Cards ownership view
- 🔐 Smart-contract ownership validation
- 🛡️ Reentrancy protection
- 🧪 Automated Hardhat testing
- 🚀 Vercel frontend deployment

---

# 🎮 Game Cards

The marketplace contains 8 unique elemental game cards:

| Card | Name | Element / Type | Rarity |
|------|------|----------------|---------|
| 1 | Emberfang | Fire | Common |
| 2 | Tidalclaw | Water | Common |
| 3 | Rootling | Earth | Common |
| 4 | Galevane | Air | Uncommon |
| 5 | Cinderjaw | Fire | Uncommon |
| 6 | Abyssara | Water | Rare |
| 7 | Terravox | Earth | Rare |
| 8 | Aetherion | Convergence | Legendary |

Each NFT contains a unique Token ID and references metadata stored on IPFS.

---

# ⛓️ Smart Contract

**Contract:** `GameCardMarketplace.sol`

**Network:** Ethereum Sepolia Testnet

**Chain ID:** `11155111`

**Contract Address:**

`0x20E4B3D85d987c788331d87d4478ecc6377bcF1F`

**Etherscan:**

https://sepolia.etherscan.io/address/0x20E4B3D85d987c788331d87d4478ecc6377bcF1F

### Smart Contract Functions

- `mintCard()`
- `listCard()`
- `cancelListing()`
- `buyCard()`
- `burnCard()`
- `ownerOf()`
- `tokenURI()`
- `totalSupply()`
- `isListed()`

### Events

- `CardMinted`
- `CardBurned`
- `CardListed`
- `ListingCancelled`
- `CardSold`

The contract uses OpenZeppelin implementations including:

- ERC-721
- ERC721URIStorage
- Ownable
- ReentrancyGuard

---

# 🏗️ Application Architecture

    User
      │
      ▼
    React + Vite Frontend
      │
      ▼
    ethers.js v6
      │
      ▼
    MetaMask
      │
      ▼
    Ethereum Sepolia
      │
      ▼
    GameCardMarketplace.sol
      │
      ▼
    IPFS / Pinata
      │
      ├── NFT Artwork
      └── NFT Metadata

---

# 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React |
| Build Tool | Vite |
| Styling | Tailwind CSS + Custom CSS |
| Blockchain Interaction | ethers.js v6 |
| Smart Contract | Solidity ^0.8.24 |
| NFT Standard | ERC-721 |
| Smart Contract Framework | Hardhat |
| Contract Libraries | OpenZeppelin |
| Blockchain | Ethereum Sepolia |
| Storage | IPFS |
| IPFS Provider | Pinata |
| Wallet | MetaMask |
| Testing | Hardhat + Mocha/Chai |
| Deployment | Vercel |

---

# 📁 Project Structure

    Elemental-Beasts-Marketplace/
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
    │   │   ├── App.jsx
    │   │   ├── useWallet.js
    │   │   ├── cardUtils.js
    │   │   ├── contractConfig.js
    │   │   └── index.css
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
    ├── .gitignore
    ├── .env.example
    └── README.md

---

# ⚙️ Installation

## Prerequisites

- Node.js
- npm
- Git
- MetaMask
- Sepolia test ETH

## Clone Repository

    git clone https://github.com/dhanushsupraj/Elemental-Beasts-Marketplace.git

    cd Elemental-Beasts-Marketplace

## Install Root Dependencies

    npm install

## Install Frontend Dependencies

    cd frontend
    npm install
    cd ..

---

# 🔐 Environment Variables

Create a `.env` file using `.env.example`.

    SEPOLIA_RPC_URL=your_sepolia_rpc_url
    PRIVATE_KEY=your_deployment_wallet_private_key
    ETHERSCAN_API_KEY=your_etherscan_api_key
    PINATA_API_KEY=your_pinata_api_key
    PINATA_API_SECRET=your_pinata_api_secret

Never commit `.env` to GitHub.

Never expose private keys, API secrets, or authentication credentials.

---

# 🧪 Smart Contract Development

## Compile

    npm run compile

## Run Tests

    npm test

The automated tests cover:

- NFT minting
- Token ID assignment
- Token URI storage
- NFT listing
- Ownership validation
- Price validation
- NFT purchasing
- Payment transfer
- Insufficient funds
- Unlisted cards
- Self-purchase prevention
- Excess ETH handling
- Listing cancellation
- NFT burning

---

# 🌐 Deploy to Sepolia

    npm run deploy:sepolia

The currently deployed contract is:

    0x20E4B3D85d987c788331d87d4478ecc6377bcF1F

---

# 🖼️ Upload Metadata to IPFS

    npm run upload:ipfs

The upload script uses Pinata to upload NFT assets and metadata to IPFS.

---

# 🖥️ Run Frontend Locally

    cd frontend

    npm install

    npm run dev

The Vite development server normally runs at:

    http://localhost:5173

Connect MetaMask and switch to the Ethereum Sepolia testnet.

---

# 🔄 Marketplace Workflow

## 1. Connect Wallet

    User
      ↓
    Connect Wallet
      ↓
    MetaMask
      ↓
    Ethereum Sepolia

## 2. Mint NFT

    Frontend
      ↓
    ethers.js
      ↓
    MetaMask
      ↓
    Smart Contract
      ↓
    ERC-721 NFT Minted

## 3. List NFT

    NFT Owner
      ↓
    Select Card
      ↓
    Set Price
      ↓
    List NFT
      ↓
    Blockchain Listing

## 4. Buy NFT

    Buyer
      ↓
    Buy NFT
      ↓
    MetaMask Transaction
      ↓
    Smart Contract
      ├── Verify Listing
      ├── Transfer ETH
      ├── Transfer NFT
      └── Remove Listing
      ↓
    Buyer Owns NFT

## 5. Manage NFTs

Users can view their owned NFTs through the **My Cards** section and manage eligible marketplace listings.

---

# 🔒 Security Considerations

### Ownership Validation

NFT ownership is validated before marketplace operations.

### Price Validation

NFT listings require a price greater than zero.

### Self-Purchase Prevention

Users cannot purchase their own listings.

### Reentrancy Protection

The marketplace uses OpenZeppelin's `ReentrancyGuard` for protected purchase operations.

### Access Control

OpenZeppelin's `Ownable` functionality is used for contract ownership.

### Secret Protection

Private keys and API credentials are stored in `.env` and excluded from version control.

### Testnet Deployment

The application is deployed on Ethereum Sepolia for development and demonstration.

> This project is intended for educational and demonstration purposes and has not undergone a professional smart-contract security audit.

---

# 📸 Screenshots
![Homepage](SCREEN_SHOTS/01_Project_DEMO/01-homepage_(Seller).jpg)

![NFT Minting](SCREEN_SHOTS/01_Project_DEMO/02-minting_(Seller).jpg)

![My Cards - Seller](SCREEN_SHOTS/01_Project_DEMO/03_My_Cards_(Seller).jpg)

![Listing Card](SCREEN_SHOTS/01_Project_DEMO/04_Listing_card_(Seller).jpg)

![Marketplace - Listed NFT](SCREEN_SHOTS/01_Project_DEMO/05-marketplace-Listed_(Buyer).jpg)

![Buy a Listed NFT](SCREEN_SHOTS/01_Project_DEMO/06_Buy_a_listed_NFT_(Buyer).jpg)

![My Cards - Buyer](SCREEN_SHOTS/01_Project_DEMO/07_My-Cards_(Buyer).jpg)

Project screenshots and development documentation are available in:

    SCREEN_SHOTS/
    ├── 01_Project_DEMO/
    ├── Complete_Process/
    └── screenshot_HTML/

---

# 🎯 Project Objectives

This project demonstrates practical experience with:

- Blockchain development
- Ethereum development
- Solidity
- Smart contracts
- ERC-721 NFTs
- NFT marketplaces
- MetaMask
- ethers.js
- IPFS
- Pinata
- React
- Vite
- Hardhat
- OpenZeppelin
- Smart contract testing
- Web3 frontend integration
- Blockchain deployment

---

# 💡 Key Learning Outcomes

### Blockchain Development

Understanding how decentralized applications interact with Ethereum networks.

### Smart Contract Development

Implementing NFT minting, ownership, listing, purchasing, cancellation, and burning using Solidity.

### NFT Development

Creating ERC-721 NFTs with metadata referenced through IPFS.

### Web3 Frontend Development

Connecting a React application to Ethereum using MetaMask and ethers.js.

### Decentralized Storage

Using IPFS and Pinata for NFT artwork and metadata.

### Testing

Writing automated Hardhat tests for successful and failure scenarios.

### Deployment

Deploying the smart contract to Ethereum Sepolia and the frontend to Vercel.

---

# 🚀 Future Improvements

- NFT rarity filtering
- Search and sorting
- Advanced marketplace filters
- Transaction history
- User profiles
- NFT transfers
- Auction-based listings
- NFT royalty support
- Gas optimization
- Additional elemental creatures
- Marketplace analytics
- Improved mobile responsiveness
- Event indexing
- Enhanced marketplace UI

---

# 👨‍💻 Author

## Dhanush Supraj

**B.Tech Computer Science and Engineering**

Elemental Beasts Marketplace is a Web3 project demonstrating:

**Blockchain + Smart Contracts + NFTs + IPFS + React + Web3 Wallet Integration**

---

# 🔗 Project Links

| Resource | Link |
|----------|------|
| 🌐 Live Application | https://elemental-beasts-marketplace.vercel.app/ |
| 💻 GitHub Repository | https://github.com/dhanushsupraj/Elemental-Beasts-Marketplace |
| ⛓️ Sepolia Contract | https://sepolia.etherscan.io/address/0x20E4B3D85d987c788331d87d4478ecc6377bcF1F |

---

# 📜 License

This project is created for educational and demonstration purposes.
