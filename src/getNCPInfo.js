import { ethers } from "ethers";
import abi from "./NCPStakingGateway.json";
import { useEffect, useState } from "react";

async function getRewarder() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.wemix.com"
  );
  const ContractABI = abi.abi;
  const gateway = new ethers.Contract(
    "0xf421e57180215af5A1D9ADA50eC7449e2CcE77B6",
    ContractABI,
    provider
  );

  return gateway;
}
export default getRewarder;
