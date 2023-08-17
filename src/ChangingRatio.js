import { useEffect, useState } from "react";
import getRewarder from "./getNCPInfo";

export default function ChangingRatio() {
  const [changeRatio, setChangeRatio] = useState();
  useEffect(() => {
    const gatewayFunc = async () => {
      const gateway = await getRewarder();
      const tx = await gateway.getNCPInfo();
      //   setChangeRatio(tx);
      //   console.log(changeRatio);
      console.log(tx);
    };
    gatewayFunc();
  }, []);

  // const reqRatio =
  return (
    <div>
      <button onClick={ChangingRatio}>dddddd</button>
    </div>
  );
}
