const { LedgerSigner } = require("@ethersproject/hardware-wallets");
require("dotenv").config();
const ethers = require("ethers");
async function getNCPStaking() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.wemix.com"
  );
  console.log(await provider.getNetwork());

  const abi = require("./NCPStaking.json");

  const signer = new LedgerSigner(provider, "hid");

  const ncpStaking = await new ethers.Contract(
    "0x6Af09e1A3c886dd8560bf4Cabd65dB16Ea2724D8",
    abi.abi,
    signer
  );
  //  컨트랙주소 꼭넣기 두번넣기
  return ncpStaking;
}

async function reqExecute() {
  const ncpStaking = await getNCPStaking();
  try {
    const tx = await ncpStaking.setRewardFeeRatioRequest(15, 300, {
      gasPrice: ethers.utils.parseUnits("101", "gwei"),
    });
    console.log(`success. ${tx.hash}`);
    const string = JSON.stringify(tx);
    const json = JSON.parse(string);
    console.log(json);
  } catch (err) {
    console.log(`Error`, err);
  }
}
reqExecute();
