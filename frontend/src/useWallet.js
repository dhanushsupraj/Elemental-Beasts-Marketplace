import { useState, useCallback, useEffect } from "react";

import { BrowserProvider, Contract } from "ethers";

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  SEPOLIA_CHAIN_ID,
} from "./contractConfig";

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    setError(null);

    if (!window.ethereum) {
      setError("MetaMask not found. Please install it to use this app.");
      return;
    }

    try {
      const browserProvider = new BrowserProvider(window.ethereum);

      const accounts = await browserProvider.send(
        "eth_requestAccounts",
        []
      );

      // Make sure the user is on Sepolia; prompt a switch if not.
      const network = await browserProvider.getNetwork();

      if (
        `0x${network.chainId.toString(16)}` !== SEPOLIA_CHAIN_ID
      ) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SEPOLIA_CHAIN_ID }],
          });
        } catch (switchError) {
          setError("Please switch MetaMask to the Sepolia testnet.");
          return;
        }
      }

      const signer = await browserProvider.getSigner();

      const marketplaceContract = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      setProvider(browserProvider);
      setAccount(accounts[0]);
      setContract(marketplaceContract);
    } catch (err) {
      setError(err.message || "Failed to connect wallet.");
    }
  }, []);

  // Re-sync if the user switches accounts in MetaMask directly.
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = async (accounts) => {
      const newAccount = accounts[0] || null;

      setAccount(newAccount);

      if (!newAccount) {
        setContract(null);
        setProvider(null);
        return;
      }

      try {
        const browserProvider = new BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();

        const marketplaceContract = new Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        setProvider(browserProvider);
        setContract(marketplaceContract);
      } catch (err) {
        console.error("Failed to update wallet account:", err);
        setContract(null);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () =>
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
  }, []);

  return { account, contract, provider, error, connect };
}