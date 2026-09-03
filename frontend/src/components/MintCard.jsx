import { useState } from "react";

export default function MintCard({ account, contract, onMinted }) {
  const [tokenURI, setTokenURI] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function handleMint(e) {
    e.preventDefault();
    if (!contract || !tokenURI) return;

    setBusy(true);
    setStatus("Minting... confirm the transaction in MetaMask.");
    try {
      const tx = await contract.mintCard(tokenURI);
      await tx.wait();
      setStatus("✅ Card minted!");
      setTokenURI("");
      onMinted();
    } catch (err) {
      setStatus(`❌ ${err.reason || err.message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto rounded-xl bg-gray-900 border border-gray-800 p-6">
      <h2 className="text-xl font-bold mb-1">Mint a Card</h2>
      <p className="text-sm text-gray-400 mb-4">
        Paste the IPFS metadata URI for the card you want to mint (e.g.{" "}
        <code className="text-xs">ipfs://bafybe.../card1.json</code>). Upload your card art and
        metadata first using <code className="text-xs">npm run upload:ipfs</code>.
      </p>

      {!account && (
        <p className="text-sm text-ember mb-3">Connect your wallet first to mint a card.</p>
      )}

      <form onSubmit={handleMint} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="ipfs://<CID>/card1.json"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          disabled={!account}
          className="rounded bg-gray-800 px-3 py-2 text-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!account || busy || !tokenURI}
          className="rounded bg-nexus px-4 py-2 font-semibold disabled:opacity-50"
        >
          {busy ? "Minting..." : "Mint Card"}
        </button>
      </form>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}
