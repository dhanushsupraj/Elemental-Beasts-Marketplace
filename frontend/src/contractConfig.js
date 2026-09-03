// Fill this in after running `npm run deploy:sepolia` from the project root.
export const CONTRACT_ADDRESS = "0x20E4B3D85d987c788331d87d4478ecc6377bcF1F";

// Sepolia testnet chain ID (used to prompt MetaMask to switch networks if needed)
export const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex

// Minimal ABI — only the functions/events the frontend actually calls.
// (You can also copy the full ABI from artifacts/contracts/GameCardMarketplace.sol/GameCardMarketplace.json
// after running `npm run compile`, if you'd rather use the complete one.)
export const CONTRACT_ABI = [
  "function mintCard(string tokenURI) external returns (uint256)",
  "function listCard(uint256 tokenId, uint256 price) external",
  "function cancelListing(uint256 tokenId) external",
  "function buyCard(uint256 tokenId) external payable",
  "function totalSupply() external view returns (uint256)",
  "function isListed(uint256 tokenId) external view returns (bool)",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function tokenURI(uint256 tokenId) external view returns (string)",
  "function listings(uint256 tokenId) external view returns (address seller, uint256 price, bool active)",
  "event CardMinted(uint256 indexed tokenId, address indexed owner, string tokenURI)",
  "event CardListed(uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event CardSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price)",
];
