import styled from "styled-components";

interface tickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface PriceProps {
  tickersData?: tickersData;
}

function Price({ tickersData }: PriceProps) {
  console.log(tickersData?.quotes.USD);

  return (
    <div>
      <HighestPrice>
        <span>The highest price registered in all time</span>
        <div>${tickersData?.quotes.USD.ath_price.toFixed(3)}</div>
      </HighestPrice>

      <BeforePrice>
        <div>
          <span>Before 1Hour</span>
          <span>{tickersData?.quotes.USD.percent_change_1h}</span>
        </div>

        <div>
          <span>Before 12Hour</span>
          <span>{tickersData?.quotes.USD.percent_change_12h}</span>
        </div>

        <div>
          <span>Before 1Day</span>
          <span>{tickersData?.quotes.USD.percent_change_24h}</span>
        </div>

        <div>
          <span>Before 30Day</span>
          <span>{tickersData?.quotes.USD.percent_change_30d}</span>
        </div>
      </BeforePrice>
    </div>
  );
}

export default Price;

const HighestPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 50px;
  border-radius: 10px;
  background-color: ${props => props.theme.bgColor};
  border-color: ${props => props.theme.boxColor};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

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
  border-radius: 10px;
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.bgColor};
    border-color: ${props => props.theme.boxColor};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    padding: 10px 20px;
  }

  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;
