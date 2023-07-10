import { ethers } from "ethers";

function getNCPStaking() {
    const provider = new ethers.providers.JsonRpcProvider('<https://api.wemix.com>')
    console.log(provider);
}
getNCPStaking();