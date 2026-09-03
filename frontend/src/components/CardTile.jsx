import { useState } from "react";
import { formatEther, parseEther } from "ethers";
import { ipfsToHttp } from "../cardUtils";

export default function CardTile({ card, account, contract, onAction }) {
  const [price, setPrice] = useState("");
  const [busy, setBusy] = useState(false);

  const isOwner =
    account &&
    card.owner &&
    card.owner.toLowerCase() === account.toLowerCase();

  const rarity = card.metadata.attributes?.find(
    (a) => a.trait_type === "Rarity"
  )?.value;

  const element = card.metadata.attributes?.find(
    (a) => a.trait_type === "Element"
  )?.value;

  async function handleList() {
    if (!price) return;

    setBusy(true);

    try {
      const tx = await contract.listCard(
        card.tokenId,
        parseEther(price)
      );

      await tx.wait();
      onAction();
    } catch (err) {
      alert(err.reason || err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleCancel() {
    setBusy(true);

    try {
      const tx = await contract.cancelListing(card.tokenId);

      await tx.wait();
      onAction();
    } catch (err) {
      alert(err.reason || err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleBuy() {
    setBusy(true);

    try {
      const tx = await contract.buyCard(card.tokenId, {
        value: card.price,
      });

      await tx.wait();
      onAction();
    } catch (err) {
      alert(err.reason || err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-[300px] rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]">

      {/* CARD IMAGE */}
      <div className="relative h-[165px] bg-black overflow-hidden">

        <img
          src={ipfsToHttp(card.metadata.image)}
          alt={card.metadata.name}
          className="w-full h-full object-contain"
        />

        {/* TOKEN NUMBER */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold">
          #{card.tokenId.toString()}
        </div>

        {/* RARITY */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white text-[10px] font-bold tracking-widest">
          {rarity || "COMMON"}
        </div>

        {/* IMAGE BOTTOM GRADIENT */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      {/* CARD INFORMATION */}
      <div className="p-4">

        {/* NAME */}
        <h3 className="text-xl font-black text-white truncate">
          {card.metadata.name}
        </h3>

        {/* ELEMENT / RARITY */}
        <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-gray-400">
          {element || "UNKNOWN"} / {rarity || "COMMON"}
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 text-xs leading-5 text-gray-400 line-clamp-2 min-h-[40px]">
          {card.metadata.description}
        </p>

        {/* LISTED PRICE */}
        {card.isListed ? (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2">
            <span className="text-[10px] tracking-widest text-gray-400">
              PRICE
            </span>

            <span className="text-sm font-bold text-white">
              {formatEther(card.price)} ETH
            </span>
          </div>
        ) : (
          <div className="mt-4 text-[10px] tracking-widest text-gray-500">
            NOT LISTED
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-4">

          {/* OWNER - LIST */}
          {isOwner && !card.isListed && (
            <div className="flex gap-2">

              <input
                type="number"
                step="0.001"
                min="0"
                placeholder="ETH price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-white/40"
              />

              <button
                disabled={busy}
                onClick={handleList}
                className="rounded-xl bg-gradient-to-r from-[#D85054] via-[#8073D5] to-[#3F8EE4] px-4 py-2 text-xs font-bold text-white transition hover:scale-105 disabled:opacity-50"
              >
                {busy ? "..." : "LIST"}
              </button>

            </div>
          )}

          {/* OWNER - CANCEL */}
          {isOwner && card.isListed && (
            <button
              disabled={busy}
              onClick={handleCancel}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              {busy ? "CANCELING..." : "CANCEL LISTING"}
            </button>
          )}

          {/* BUYER - BUY */}
          {!isOwner && card.isListed && (
            <button
              disabled={busy || !account}
              onClick={handleBuy}
              className="w-full rounded-xl bg-gradient-to-r from-[#D85054] via-[#8073D5] to-[#3F8EE4] px-4 py-3 text-xs font-black tracking-wider text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50"
            >
              {!account
                ? "CONNECT WALLET"
                : busy
                ? "BUYING..."
                : `BUY FOR ${formatEther(card.price)} ETH`}
            </button>
          )}

          {/* NOT CONNECTED */}
          {!isOwner && !card.isListed && !account && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-[10px] tracking-widest text-gray-500">
              CONNECT WALLET TO TRADE
            </div>
          )}

        </div>
      </div>
    </div>
  );
}