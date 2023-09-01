import styled from "styled-components";

const HighestPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 50px;
  border-radius: 10px;
  background-color: ${props => props.theme.bgColor};
  border: 1px solid ${props => props.theme.priceColor};
  box-shadow: ${props => props.theme.priceColor} 0px 0px 4px 0px;

  span {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

const BeforePrice = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 20px;
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.priceColor};
    box-shadow: ${props => props.theme.priceColor} 0px 0px 4px 0px;
    padding: 10px 20px;
    border-radius: 10px;
  }

  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

export { HighestPrice, BeforePrice };
