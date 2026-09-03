const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameCardMarketplace", function () {
  let marketplace;
  let owner, alice, bob;
  const SAMPLE_URI = "ipfs://bafybeigsamplecid/card1.json";

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();

    const GameCardMarketplace = await ethers.getContractFactory("GameCardMarketplace");
    marketplace = await GameCardMarketplace.deploy();
    await marketplace.waitForDeployment();
  });

  describe("Minting", function () {
    it("mints a new card to the caller with the correct tokenURI", async function () {
      await expect(marketplace.connect(alice).mintCard(SAMPLE_URI))
        .to.emit(marketplace, "CardMinted")
        .withArgs(0, alice.address, SAMPLE_URI);

      expect(await marketplace.ownerOf(0)).to.equal(alice.address);
      expect(await marketplace.tokenURI(0)).to.equal(SAMPLE_URI);
    });

    it("increments token IDs for each new mint", async function () {
      await marketplace.connect(alice).mintCard(SAMPLE_URI);
      await marketplace.connect(bob).mintCard(SAMPLE_URI);

      expect(await marketplace.totalSupply()).to.equal(2);
      expect(await marketplace.ownerOf(0)).to.equal(alice.address);
      expect(await marketplace.ownerOf(1)).to.equal(bob.address);
    });
  });

  describe("Listing", function () {
    beforeEach(async function () {
      await marketplace.connect(alice).mintCard(SAMPLE_URI); // tokenId 0
    });

    it("allows the owner to list their card", async function () {
      const price = ethers.parseEther("1");

      await expect(marketplace.connect(alice).listCard(0, price))
        .to.emit(marketplace, "CardListed")
        .withArgs(0, alice.address, price);

      expect(await marketplace.isListed(0)).to.equal(true);
    });

    it("rejects listing by someone who does not own the card", async function () {
      const price = ethers.parseEther("1");
      await expect(marketplace.connect(bob).listCard(0, price)).to.be.revertedWith(
        "Not the owner of this card"
      );
    });

    it("rejects a listing price of zero", async function () {
      await expect(marketplace.connect(alice).listCard(0, 0)).to.be.revertedWith(
        "Price must be greater than zero"
      );
    });

    it("allows the seller to cancel their own listing", async function () {
      const price = ethers.parseEther("1");
      await marketplace.connect(alice).listCard(0, price);

      await expect(marketplace.connect(alice).cancelListing(0))
        .to.emit(marketplace, "ListingCancelled")
        .withArgs(0, alice.address);

      expect(await marketplace.isListed(0)).to.equal(false);
    });
  });

  describe("Buying", function () {
    const price = ethers.parseEther("1");

    beforeEach(async function () {
      await marketplace.connect(alice).mintCard(SAMPLE_URI); // tokenId 0
      await marketplace.connect(alice).listCard(0, price);
    });

    it("transfers the card and pays the seller on a successful purchase", async function () {
      const sellerBalanceBefore = await ethers.provider.getBalance(alice.address);

      await expect(marketplace.connect(bob).buyCard(0, { value: price }))
        .to.emit(marketplace, "CardSold")
        .withArgs(0, alice.address, bob.address, price);

      expect(await marketplace.ownerOf(0)).to.equal(bob.address);
      expect(await marketplace.isListed(0)).to.equal(false);

      const sellerBalanceAfter = await ethers.provider.getBalance(alice.address);
      expect(sellerBalanceAfter).to.equal(sellerBalanceBefore + price);
    });

    it("reverts if the card is not listed", async function () {
      await marketplace.connect(alice).mintCard(SAMPLE_URI); // tokenId 1, never listed
      await expect(
        marketplace.connect(bob).buyCard(1, { value: price })
      ).to.be.revertedWith("Card is not listed for sale");
    });

    it("reverts if not enough ETH is sent", async function () {
      const tooLittle = ethers.parseEther("0.5");
      await expect(
        marketplace.connect(bob).buyCard(0, { value: tooLittle })
      ).to.be.revertedWith("Insufficient ETH sent");
    });

    it("reverts if the seller tries to buy their own card", async function () {
      await expect(
        marketplace.connect(alice).buyCard(0, { value: price })
      ).to.be.revertedWith("Cannot buy your own card");
    });

    it("refunds any excess ETH sent above the listing price", async function () {
      const overpay = ethers.parseEther("1.5");
      const buyerBalanceBefore = await ethers.provider.getBalance(bob.address);

      const tx = await marketplace.connect(bob).buyCard(0, { value: overpay });
      const receipt = await tx.wait();
      const gasCost = receipt.gasUsed * receipt.gasPrice;

      const buyerBalanceAfter = await ethers.provider.getBalance(bob.address);
      // buyer should only be down by `price` + gas, not the full `overpay` + gas
      expect(buyerBalanceBefore - buyerBalanceAfter).to.equal(price + gasCost);
    });
  });
});
