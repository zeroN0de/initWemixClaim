import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./NCPStaking.json";
import { styled } from "styled-components";
import axios from "axios";
import NcpGet from "./CurrRatio";
import ChangingRatio from "./ChangingRatio";
import { AiOutlineArrowRight } from "react-icons/ai";

const MainBody = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
`;
const BodyDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  border: 3px solid orange;
  height: 100vh;
  min-width: 1055px;
  max-width: 1200px;
`;

const ApplyDiv = styled.div`
  font-size: 30px;
  margin: 10px 10px;
  height: 50%;
  width: 40%;

  button {
    font-size: 30px;
  }
`;

const LeftMainDiv = styled.div`
  margin: 10px 10px;
  padding: 0 10px;
  display: flex;
  height: 50%;
  width: 45%;
  justify-content: center;
  align-items: center;
`;
const LeftInnerDiv = styled.div`
  border: 0.3px solid gray;
  padding: 20px 30px;
  border-radius: 15px;
  width: 1600px;
  @media (max-width: 990px) {
    p {
      font-size: 12px;
    }
  }
`;
const LeftTitleDiv = styled.div`
  font-size: 35px;
  font-weight: 650;
`;
const LeftDescDiv = styled.div`
  font-size: 15px;
  color: #6d6d6d;
  padding-bottom: 30px;
  p {
    padding: 10px 0;
    font-weight: 450;
  }
`;
const LeftInputdiv = styled.div`
  border-top: 1px solid gray;

  padding: 15px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  input {
    border: none;
    font-size: 18px;
    font-weight: 600;
    padding: 10px;
    border-bottom: 1px solid gray;
    &:hover {
      border: 1px solid blue;
      border-radius: 5px;
    }
  }
`;
const AddGetFloating = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftBtn = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
`;
const CategoryDiv = styled.div`
  padding: 20px;
  display: flex;
  font-size: 20px;
  justify-content: space-around;
  align-items: center;
`;
const ReqeustDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  flex: 1;
  button {
    font-size: 20px;
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 10px 5px;
  }
`;
const ConfirmDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  button {
    font-size: 20px;
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 10px 5px;
  }
`;
const FloatingDiv = styled.div`
  flex: 1;
  position: relative;

  input {
    font-size: 16px;
    padding: 10px;
    background: transparent;
    border: none;
    border-bottom: 2px solid #c0c0c0;
    outline: none;
    transition: all 0.3s;

    &:focus,
    &:not(:placeholder-shown) {
      + label {
        top: -10px;
        font-size: 12px;
        color: #0077cc;
      }

      border-bottom-color: #0077cc;
    }
  }
  label {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #757575;
    transition: all 0.3s;
    pointer-events: none;
  }
`;
const FlexThree = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
`;

function Ratio() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [ratioInput, setRatioInput] = useState("0");
  const [reqBtn, setReqBtn] = useState(true);
  const [conBtn, setConBtn] = useState(false);

  const inputRatio = (e) => {
    setRatioInput(e.target.value * 100);
  };

  const clickReq = () => {
    setReqBtn(true);
    setConBtn(false);
  };
  const clickCon = () => {
    setReqBtn(false);
    setConBtn(true);
  };

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
      const tx = await contract.setRewardFeeRatioRequest(15, ratioInput, {
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
  // const reqInfo = async () => {
  //   if (contract) {
  //     try {
  //       const ratioInfo = await contract.FeeRatioRequestInfo();
  //       console.log(ratioInfo);
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //   } else {
  //     console.log("contract is not connected");
  //   }
  // };

  return (
    <MainBody>
      <BodyDiv>
        <LeftMainDiv>
          <LeftInnerDiv>
            <LeftTitleDiv>NCP Staking</LeftTitleDiv>
            <CategoryDiv>
              <ReqeustDiv>
                <button
                  onClick={clickReq}
                  style={{
                    color: reqBtn ? "black" : "gray",
                    borderBottom: reqBtn ? "2px solid black" : "none",
                  }}
                >
                  Request Fee Ratio
                </button>
              </ReqeustDiv>
              <ConfirmDiv>
                <button
                  onClick={clickCon}
                  style={{
                    color: conBtn ? "black" : "gray",
                    borderBottom: conBtn ? "2px solid black" : "none",
                  }}
                >
                  Confirm Fee Ratio
                </button>
              </ConfirmDiv>
            </CategoryDiv>
            <LeftDescDiv>
              {reqBtn ? (
                <p>
                  수수료 비율을 설정하는 기능입니다.
                  <br />
                  <br />이 기능을 사용 후 7일 또는 604,800블록 이후에 Confirm
                  Fee Ratio 를 통해 setRewardFeeRatio 기능을 사용해야 수수료가
                  적용됩니다.
                </p>
              ) : (
                <p>
                  수수료 변경을 적용하는 기능입니다.
                  <br />
                  <br />이 기능은 Request Fee Ratio 를 활용해
                  setRewardFeeRatioRequest 함수로 수수료 변경 요청 한 후, 7일
                  또는 604,800블록 이후에 사용해야 합니다.
                </p>
              )}
            </LeftDescDiv>
            <AddGetFloating>
              <NcpGet />
              <FlexThree>
                <AiOutlineArrowRight size={25} />
              </FlexThree>
              <FloatingDiv>
                <input
                  onChange={inputRatio}
                  placeholder=""
                  type="number"
                  id="name"
                ></input>
                <label htmlFor="name"> Adjust Ratio</label>
              </FloatingDiv>
            </AddGetFloating>
            {/* <div>Fee Ratio to Be Adjusted</div>
              <input onChange={inputRatio} type="number" /> */}

            <LeftBtn>
              {reqBtn ? (
                <button onClick={executeContractFunction}>
                  Ratio 변경요청
                </button>
              ) : (
                <div>bye</div>
              )}

              {/* <button onClick={ncpGet}>인포</button> */}
            </LeftBtn>
          </LeftInnerDiv>
        </LeftMainDiv>
        {/* <ApplyDiv>
          <button onClick={executeConfirm}>Ratio 변경확정</button>
        </ApplyDiv> */}
      </BodyDiv>
    </MainBody>
  );
}
export default Ratio;
