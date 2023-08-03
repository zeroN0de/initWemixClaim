import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./NCPStaking.json";
import { styled } from "styled-components";

const TestDiv = styled.button`
  font-size: 50px;
  margin: 10px 10px;
`;
const ApplyDiv = styled.div`
  font-size: 50px;
  margin: 10px 10px;
  button {
    font-size: 50px;
  }
`;

function Ratio() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        // Request account access
        try {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          setProvider(provider);
          setSigner(signer);
        } catch (err) {
          alert("please Login metemask");
        }
      } else {
        alert("plase install metamask!");
      }

      // else {
      //   window.alert("Please install MetaMask!");
      //   window.open("https://metamask.io/");
      // }
    };
    // init();
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

  const executeConfirm = async () => {
    if (contract) {
      try {
        const tx = await contract.setRewardFeeRatio(15, {
          gasPrice: ethers.utils.parseUnits("101", "gwei"),
        });
        console.log(tx);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Contract is not connected");
    }
  };
  return (
    <div>
      <TestDiv onClick={executeContractFunction}>분배율 변경 요청</TestDiv>
      <ApplyDiv>
        <button onClick={executeConfirm}>분배율 변경 확정</button>
      </ApplyDiv>
    </div>
  );
}
export default Ratio;
