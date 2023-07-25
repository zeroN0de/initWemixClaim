const { LedgerSigner } = require("@ethersproject/hardware-wallets");
const ethers = require("ethers");
async function getNCPStaking() {
  const provider = new ethers.providers.JsonRpcProvider("https://api.wemix.com");
  const abi = require("./NCPStaking.json");
//   const wallet = new ethers.Wallet("Pravate Key").connect(provider);
  const signer = new LedgerSigner(provider);
//   const ncpStaking = await ethers.Contract("컨트랙트 주소넣기 꼭넣기.", abi.abi, signer);
//  컨트랙주소 꼭넣기 두번넣기
  return ncpStaking;
}

async function reqExecute() {
    const ncpStaking = await getNCPStaking();
    try {
        const tx = await ncpStaking.setRewardFeeRatioRequest(15, 300, {gasPrice : ethers.utils.parseUnits('101','gwei')})
        console.log(`success. ${tx.hash}`);
        const string = JSON.stringify(tx)
        const json = JSON.parse(string);
        console.log(json)
    }catch(err) { 
        console.log(`Error`, err);
    }
}
reqExecute();