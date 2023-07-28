import { styled } from "styled-components";

const MainDiv = styled.div`
  border: 3px solid orange;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BodyDiv = styled.div`
  border: 3px solid green;
  height: 50vh;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ClaimTextTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 30px;
`;
const ClaimTextAmount = styled.h3`
  display: flex;
  justify-content: center;
`;
const ClaimBtn = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  button {
    font-size: 20px;
    font-weight: 600;
    color: skyblue;
    border-radius: 50px;
    &:hover {
      background-color: skyblue;
      color: black;
    }
  }
`;

function Claims() {
  return (
    <div>
      <MainDiv>
        <BodyDiv>
          <div>
            <div>
              <ClaimTextTitle>Wemix Rewards Claim Page</ClaimTextTitle>
            </div>

            <div>
              <ClaimTextAmount>Commission : 수량이나와야</ClaimTextAmount>
            </div>
            <ClaimBtn>
              <button>Claim</button>
            </ClaimBtn>
          </div>
        </BodyDiv>
      </MainDiv>
    </div>
  );
}
export default Claims;
