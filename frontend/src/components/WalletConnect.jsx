export default function WalletConnect({ account, error, connect }) {
  return (
    <div className="flex items-center gap-3">
      {error && <span className="text-sm text-red-400">{error}</span>}
      {account ? (
        <span className="rounded-full bg-gray-800 px-4 py-2 text-sm font-mono">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        <button
          onClick={connect}
          className="rounded-full bg-nexus px-5 py-2 font-semibold text-white hover:opacity-90 transition"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
