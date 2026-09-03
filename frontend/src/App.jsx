import { useState, useEffect, useCallback } from "react";

import { useWallet } from "./useWallet";

import { fetchAllCards } from "./cardUtils";

import WalletConnect from "./components/WalletConnect";

import MintCard from "./components/MintCard";

import Marketplace from "./components/Marketplace";

import MyCards from "./components/MyCards";

const TABS = ["Marketplace", "Mint", "My Cards"];

export default function App() {
  const { account, contract, error, connect } = useWallet();

  const [activeTab, setActiveTab] = useState("Marketplace");

  const [cards, setCards] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadCards = useCallback(async () => {
    if (!contract) return;

    setLoading(true);

    try {
      const allCards = await fetchAllCards(contract);
      setCards(allCards);
    } catch (err) {
      console.error("Failed to load cards:", err);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  return (
    <div className="min-h-screen w-screen bg-black text-white relative">
      
      {/* =========================================================
          ABSTRACT BACKGROUND ORBS
          ========================================================= */}

      <div className="background-orb orb-red"></div>
      <div className="background-orb orb-purple"></div>
      <div className="background-orb orb-blue"></div>
      <div className="background-orb orb-green"></div>
      <div className="background-orb orb-yellow"></div>

      {/* =========================================================
          WEBSITE CONTENT
          ========================================================= */}

      <div className="relative z-10">

        {/* =======================================================
            HEADER
            ======================================================= */}

        <header className="border-b border-white/10 px-8 py-5">

          <div className="flex items-center justify-between">

            {/* TITLE */}

            <div>
              <p className="text-xs font-semibold tracking-[0.4em] text-[#B8B8B8] mb-1">
                ELEMENTAL
              </p>

              <h1 className="gradient-text text-5xl font-black tracking-tight leading-none">
                BEASTS
              </h1>

              <h2 className="mt-1 text-2xl font-black tracking-tight">
                MARKETPLACE
              </h2>

              <p className="text-xs text-[#B8B8B8] mt-2">
                Decentralized game card trading on Sepolia testnet
              </p>
            </div>

            {/* WALLET */}

            <div>
              <WalletConnect
                account={account}
                error={error}
                connect={connect}
              />
            </div>

          </div>

        </header>

        {/* =======================================================
            NAVIGATION
            ======================================================= */}

        <nav className="flex gap-3 px-8 py-4 items-center">

          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#D85054] via-[#8073D5] to-[#3F8EE4] shadow-lg transition"
                  : "px-5 py-2 rounded-full text-xs font-semibold text-white bg-black border border-white/20 hover:border-white/40 hover:bg-[#111111] transition"
              }
            >
              {tab === "Marketplace" && "🛒 "}
              {tab === "Mint" && "⚡ "}
              {tab === "My Cards" && "🎴 "}
              {tab}
            </button>
          ))}

          {/* REFRESH */}

          <button
            onClick={loadCards}
            className="ml-auto px-5 py-2 rounded-full text-xs font-semibold text-white bg-black border border-white/20 hover:border-white/40 hover:bg-[#111111] transition"
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>

        </nav>

        {/* =======================================================
            MAIN CONTENT
            ======================================================= */}

        <main className="px-8 pb-6">

          {activeTab === "Marketplace" && (
            <Marketplace
              cards={cards}
              account={account}
              contract={contract}
              onAction={loadCards}
            />
          )}

          {activeTab === "Mint" && (
            <MintCard
              account={account}
              contract={contract}
              onMinted={loadCards}
            />
          )}

          {activeTab === "My Cards" && (
            <MyCards
              cards={cards}
              account={account}
              contract={contract}
              onAction={loadCards}
            />
          )}

        </main>

      </div>

    </div>
  );
}