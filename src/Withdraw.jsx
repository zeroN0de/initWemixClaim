import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./GovStaking.json";
import { styled } from "styled-components";

const TestDiv = styled.button`
  font-size: 50px;
  margin: 10px 0;
`;

function Withdraw() {
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
      const contractAddress = "0xEaed1D41A587f7e2821080829013e352cEc91d75";
      const contractABI = abi.abi;
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
    } else {
      console.log("bye");
    }
  }, [signer]);
  const executeContractFunction = async () => {
    if (contract) {
      try {
        const tx = await contract.deposit({
          value: "1000000000000",
          gasPrice: ethers.utils.parseUnits("101", "gwei"),
        });
        console.log(tx);
      } catch (err) {
        console.error("Tx has been rejected", err);
      }
    } else {
      console.log("Contract is not connected");
    }
  };

  return (
    <div>
      <TestDiv onClick={executeContractFunction}>Testnet Withdraw</TestDiv>
    </div>
  );
}
export default Withdraw;
