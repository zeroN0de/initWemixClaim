
const { LedgerSigner } = require("@ethersproject/hardware-wallets");
const { ethers } = require("ethers");

async function ledgerSigned () { 
    const provider = new ethers.providers.JsonRpcProvider('https://api.test.wemix.com')
    console.log(provider)
    // const ledgerSigner = new LedgerSigner(provider, "hid", "TESTNET") 
    const ledgerSigner = new LedgerSigner(provider);
    console.log(ledgerSigner)
}
ledgerSigned();

