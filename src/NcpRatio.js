// import ethers from "ethers";

// import dotenv from 'dotenv';

const { LedgerSigner } = require("@ethersproject/hardware-wallets");
const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid");
const ethers = require("ethers");
require("dotenv").config();

// async function checkLedgerConnection() {
//     try{
//         const transport = await TransportNodeHid.create()
//         console.log("ledger is Connected'")
//         transport.close();
//     }
//     catch(err){
//         console.log("not Connected")
//     }
// }
// checkLedgerConnection().then(transport => console.log("연결"));

async function NcpRatio() {
  const provider = new ethers.providers.JsonRpcProvider("https://api.wemix.com");

  //chain Id Check
  //   const getChainId = (await provider.getNetwork()).chainId;
  //   console.log(getChainId);

  // const wallet = (new ethers.Wallet(process.env.PRIVATE_KEY)).connect(provider);

  // console.log(process.env.PRIVATE_KEY)
  // console.log(wallet)
  const abi = require("./NCPStaking.json");
  const ledgerSigner = new LedgerSigner(provider);
    console.log(provider.formatter);

  // console.log(abi.abi)
  const ncpStaking = new ethers.Contract("0x088AcFcd91aEEB39fF9aDbC0f5b5c36749D89fea", abi.abi, ledgerSigner);
  // console.log('ncpStaking : ',ncpStaking)
  return ncpStaking;
}
NcpRatio();

// 요청 먼저 하고,
async function RequestRatio() {
  const stakingNCP = await NcpRatio();
  const RatioRequest = await stakingNCP.setRewardFeeRatioRequest(15, 500, {
    gasPrice: ethers.utils.parseUnits("101", "gwei"),
    gasLimit: "100000",
  });
  const transactionReceipt = await RatioRequest.wait();
  console.log(transactionReceipt);
}
// RequestRatio().catch((err) => {
//   console.log(err);
// });

// 7일 뒤에 확정 짓고.
async function showRatio() {
  const stakingNCP = await NcpRatio();
  const showFee = await stakingNCP.setRewardFeeRatio(1, {
    gasPrice: ethers.utils.parseUnits("101", "gwei"),
    gasLimit: "100000",
    chainId: "1111",
  });
  return showFee;
}
// showRatio();
