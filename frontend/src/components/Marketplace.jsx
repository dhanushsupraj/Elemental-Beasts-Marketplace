import CardTile from "./CardTile";

export default function Marketplace({ cards, account, contract, onAction, showAll }) {
  const visible = showAll ? cards : cards.filter((c) => c.isListed);

  if (visible.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        {showAll ? "No cards minted yet." : "No cards are currently listed for sale."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {visible.map((card) => (
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
