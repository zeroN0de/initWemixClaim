import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./NCPStaking.json";
import { styled } from "styled-components";

const TestDiv = styled.button`
  font-size: 50px;
  margin: 10px 0;
`;

function Ratio() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        // Request account access
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
      } else {
        console.log("Please install MetaMask!");
      }
    };
    init();
  }, []);
  useEffect(() => {
    if (signer) {
      const contractAddress = "0x6Af09e1A3c886dd8560bf4Cabd65dB16Ea2724D8";
      const contractABI = abi.abi;
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
    }
  }, [signer]);
  const executeContractFunction = async () => {
    if (contract) {
      const tx = await contract.setRewardFeeRatioRequest(15, 300, {
        gasPrice: ethers.utils.parseUnits("101", "gwei"),
      });
      console.log(tx);
    } else {
      console.log("Contract is not connected");
    }
  };
  return (
    <div>
      <TestDiv onClick={executeContractFunction}>change ratio</TestDiv>
    </div>
  );
}
export default Ratio;
