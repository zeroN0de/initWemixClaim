//
// 테스트넷 deposit
//

require("dotenv").config();

const { LedgerSigner } = require("@ethersproject/hardware-wallets");
const ethers = require("ethers");

async function getGovStaking() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.test.wemix.com"
  );

  console.log(provider);
  console.log((await provider.getNetwork()).chainId);

  const abi = require("./GovStaking.json");

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);
  const signer = new LedgerSigner(provider);
  // let getAdd = await signer.getAddress();
  // console.log(getAdd);
  const govStaking = new ethers.Contract(
    "0xEaed1D41A587f7e2821080829013e352cEc91d75",
    abi.abi,
    wallet
  );
  return govStaking;
}

async function execute() {
  const govStaking = await getGovStaking();
  try {
    const tx = await govStaking.deposit({
      value: "1000000000000000000",
      gasPrice: ethers.utils.parseUnits("101", "gwei"),
    });
    console.log(`됐나요?,${tx.hash}`);
    const string = JSON.stringify(tx);
    const json = JSON.parse(string);
    console.log(json);
  } catch (err) {
    console.log(err);
  }
}
execute();
