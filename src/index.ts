import * as CryptoJS from "crypto-js";

// Structure
class Block {
  // Types
  static calculateHash = (
    index: number,
    previosHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previosHash + timestamp + data).toString();

  // Validation
  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previosHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previosHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previosHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previosHash = previosHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}
// Initialization
const genesisBlock: Block = new Block(0, "304231", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();

  const newHash: string = Block.calculateHash(
    newIndex,
    previousBlock.hash,
    newTimeStamp,
    data
  );

  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );

  addBlock(newBlock);

  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateHash(
    aBlock.index,
    aBlock.previosHash,
    aBlock.timestamp,
    aBlock.data
  );

// Validation
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previosHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

// Test
createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");

console.log(blockchain);

export {};
