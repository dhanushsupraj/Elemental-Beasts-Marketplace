import CardTile from "./CardTile";

export default function MyCards({ cards, account, contract, onAction }) {
  if (!account) {
    return <p className="text-center text-gray-500 mt-10">Connect your wallet to see your cards.</p>;
  }

  const owned = cards.filter((c) => c.owner.toLowerCase() === account.toLowerCase());

  if (owned.length === 0) {
    return <p className="text-center text-gray-500 mt-10">You don't own any cards yet — mint one!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {owned.map((card) => (
        <CardTile
          key={card.tokenId}
          card={card}
          account={account}
          contract={contract}
          onAction={onAction}
        />
      ))}
    </div>
  );
}
