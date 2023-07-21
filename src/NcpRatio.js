// import ethers from "ethers";

// import dotenv from 'dotenv';

const { LedgerSigner } = require('@ethersproject/hardware-wallets');
const ethers = require('ethers');
require('dotenv').config();

async function NcpRatio () {
    const provider = new ethers.providers.JsonRpcProvider('https://api.test.wemix.com')
    // console.log(provider)
    const wallet = (new ethers.Wallet(process.env.PRIVATE_KEY)).connect(provider);
    // console.log(process.env.PRIVATE_KEY)
    // console.log(wallet)
    const abi = require('./NCPStaking.json');
    const ledgerSigner = new LedgerSigner(provider);
    console.log(ledgerSigner)

    // console.log(abi.abi)
    const ncpStaking = new ethers.Contract('0x64d2ccd2C4c7aC869b9f776CbC7b4d6c6fdc6022', abi.abi, ledgerSigner);
    // console.log('ncpStaking : ',ncpStaking)
    return ncpStaking;
}
NcpRatio();


// 요청 먼저 하고,
async function RequestRatio(){
    const stakingNCP = await NcpRatio();
    const RatioRequest = await stakingNCP.setRewardFeeRatioRequest(NCPID, _feeRatio, {
        gasPrice : ethers.utils.parseUnits('101','gwei'),
        gasLimit : "100000",
    })
    return RatioRequest;
}

// 7일 뒤에 확정 짓고.
async function showRatio (){
    const stakingNCP =await NcpRatio();
    const showFee = await stakingNCP.setRewardFeeRatio(1, {
        gasPrice : ethers.utils.parseUnits('101','gwei'),
        gasLimit : "100000",
    })    
    return showFee

}
// showRatio();
