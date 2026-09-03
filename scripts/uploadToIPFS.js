/**
 * Uploads each card's image and metadata JSON to IPFS via Pinata.
 *
 * Expects:
 *   /images/card1.png, card2.png, ... (you supply these — see README)
 *   /metadata/card1.json, card2.json, ... (already generated for you)
 *
 * Usage:
 *   node scripts/uploadToIPFS.js
 *
 * Output:
 *   /metadata/uploaded.json — a list of { name, metadataURI } for each card,
 *   ready to feed into the minting step.
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pinataSDK = require("@pinata/sdk");

const { PINATA_API_KEY, PINATA_API_SECRET } = process.env;

if (!PINATA_API_KEY || !PINATA_API_SECRET) {
  console.error("Missing PINATA_API_KEY / PINATA_API_SECRET in your .env file.");
  process.exit(1);
}

const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

const IMAGES_DIR = path.join(__dirname, "..", "images");
const METADATA_DIR = path.join(__dirname, "..", "metadata");
const CARD_COUNT = 8;

async function uploadImage(cardNumber) {
  // Adjust the extension here if your images are .jpg/.jpeg instead of .png
  const imagePath = path.join(IMAGES_DIR, `card${cardNumber}.png`);
  if (!fs.existsSync(imagePath)) {
    throw new Error(
      `Missing image file: ${imagePath}. Add your card art there before running this script.`
    );
  }
  const readableStream = fs.createReadStream(imagePath);
  const result = await pinata.pinFileToIPFS(readableStream, {
    pinataMetadata: { name: `card${cardNumber}-image` },
  });
  return `ipfs://${result.IpfsHash}`;
}

async function uploadMetadata(cardNumber, imageURI) {
  const metadataPath = path.join(METADATA_DIR, `card${cardNumber}.json`);
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
  metadata.image = imageURI; // replace the placeholder with the real IPFS image URI

  const result = await pinata.pinJSONToIPFS(metadata, {
    pinataMetadata: { name: `card${cardNumber}-metadata` },
  });
  return `ipfs://${result.IpfsHash}`;
}

async function main() {
  const uploaded = [];

  for (let i = 1; i <= CARD_COUNT; i++) {
    console.log(`Uploading card ${i}...`);
    const imageURI = await uploadImage(i);
    const metadataURI = await uploadMetadata(i, imageURI);
    console.log(`  image:    ${imageURI}`);
    console.log(`  metadata: ${metadataURI}`);
    uploaded.push({ card: i, imageURI, metadataURI });
  }

  const outPath = path.join(METADATA_DIR, "uploaded.json");
  fs.writeFileSync(outPath, JSON.stringify(uploaded, null, 2));
  console.log(`\n✅ All cards uploaded. Summary written to ${outPath}`);
  console.log("Use each metadataURI as the tokenURI argument when calling mintCard().");
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
