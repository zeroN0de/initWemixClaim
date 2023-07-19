// import ethers from "ethers";

// import dotenv from 'dotenv';

const ethers = require('ethers');
require('dotenv').config();

async function NcpRatio () {
    const provider = new ethers.providers.JsonRpcProvider('https://api.test.wemix.com')
    // console.log(provider)
    const wallet = (new ethers.Wallet(process.env.PRIVATE_KEY)).connect(provider);
    // console.log(process.env.PRIVATE_KEY)
    // console.log(wallet)
    const abi = require('./NCPStaking.json');

    // console.log(abi.abi)
    const ncpStaking = new ethers.Contract('0x64d2ccd2C4c7aC869b9f776CbC7b4d6c6fdc6022', abi.abi, wallet);
    // console.log(ncpStaking)
    
    return ncpStaking;
    
}
async function showRatio (){
    const stakingNCP =await NcpRatio();
    const showFee = await stakingNCP.setRewardFeeRatio(1, {
        gasPrice : ethers.utils.parseUnits('101','gwei'),
        gasLimit : "100000",
    })
    const getFee = await stakingNCP.getRewarder(2)
    console.log(getFee)
    // console.log(showFee)
    return showFee
}
showRatio();

// const commissions = await getNCPStaking.setRewardFeeRatio(10, {gasPrice : ethers.utils.parseUnits('101','gwei')});
// console.log(commissions)
// export default NcpRatio;
