import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import * as Style from "../styles/Coins";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  // console.log(coins);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Style.Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Style.Header>
        <Style.Title>COINS</Style.Title>
      </Style.Header>
      {isLoading ? (
        <Style.Loader>Loading...</Style.Loader>
      ) : (
        <Style.CoinsList>
          {data?.slice(0, 100).map(coin => (
            <Style.Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Style.Img
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Style.Coin>
          ))}
        </Style.CoinsList>
      )}
    </Style.Container>
  );
}

export default Coins;
