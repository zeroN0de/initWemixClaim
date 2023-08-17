import { useEffect, useState } from "react";
import getRewarder from "./getNCPInfo";
import { styled } from "styled-components";

const CurrDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 5;
  align-items: center;
  background-color: gray;
  padding: 10px 0;
  font-size: 20px;
  font-weight: 700;
  border-radius: 10px;
  min-width: 183px;
  color: white;
`;

export default function NcpGet() {
  const [ratioValue, setRatioValue] = useState(null);
  useEffect(() => {
    const gatewayFunc = async () => {
      const gateway = await getRewarder();
      const tx = await gateway.getNCPInfo();
      const feeRatio = parseInt(tx[9].feeRatio._hex, 16);
      setRatioValue(feeRatio);
    };
    gatewayFunc();
  }, []);

  // return feeRatio;
  return (
    <CurrDiv>
      <div>Current Ratio</div>
      <div>{ratioValue ? `${ratioValue / 100}%` : "%"}</div>
    </CurrDiv>
  );
}
