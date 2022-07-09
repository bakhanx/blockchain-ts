import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}
class Block implements BlockShape {
  public hash: string;
  constructor(
    public readonly prevHash: string,
    public readonly height: number,
    public readonly data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prev: string, height: number, data: string) {
    const toHash = `${prev}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newblock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newblock);
  }
  public getBlocks() : readonly Block[]{
    return this.blocks;
  }
}

const blockchain = new Blockchain();
blockchain.addBlock('First one');
blockchain.addBlock('Second one');
blockchain.addBlock('Third one');

// Defend Hack using readonly 
// blockchain.getBlocks().push(new Block('Hacking',3333,'bbbb'));
// blockchain.getBlocks()[blockchain.getBlocks().length-1].data = "hacking";

console.log(blockchain.getBlocks());