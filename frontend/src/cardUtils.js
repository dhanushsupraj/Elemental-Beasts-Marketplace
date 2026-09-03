// Convert an ipfs:// URI to a fetchable HTTPS gateway URL.
export function ipfsToHttp(uri) {
  if (!uri) return "";
  if (uri.startsWith("ipfs://")) {
    return `https://gateway.pinata.cloud/ipfs/${uri.replace("ipfs://", "")}`;
  }
  return uri;
}

// Fetch full on-chain + off-chain data for a single tokenId.
export async function fetchCard(contract, tokenId) {
  const [owner, uri, listing] = await Promise.all([
    contract.ownerOf(tokenId),
    contract.tokenURI(tokenId),
    contract.listings(tokenId),
  ]);

  let metadata = { name: `Card #${tokenId}`, description: "", image: "", attributes: [] };
  try {
    const res = await fetch(ipfsToHttp(uri));
    metadata = await res.json();
  } catch (err) {
    console.warn(`Could not load metadata for token ${tokenId}:`, err);
  }

  return {
    tokenId,
    owner,
    uri,
    metadata,
    isListed: listing.active,
    price: listing.price,
    seller: listing.seller,
  };
}

// Fetch data for every minted card (0..totalSupply-1).
export async function fetchAllCards(contract) {
  const total = Number(await contract.totalSupply());
  const cards = [];
  for (let i = 0; i < total; i++) {
    cards.push(await fetchCard(contract, i));
  }
  return cards;
}
