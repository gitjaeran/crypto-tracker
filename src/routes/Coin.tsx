import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import CandleStick from "./CandleStick";
import * as Style from "../styles/Coin";

interface ICoinProps {
  isDark: boolean;
}

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
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

function Coin({ isDark }: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>(); // console.log(location | state.name); //state: { name: coin.name }
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const candleStickMatch = useRouteMatch("/:coinId/candleStick");
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();

  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      // refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;

  return (
    <Style.Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>

      <Style.Header>
        <Style.Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Style.Title>
      </Style.Header>

      {loading ? (
        <Style.Loader>Loading...</Style.Loader>
      ) : (
        <>
          <Style.Overview>
            <Style.OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </Style.OverviewItem>
            <Style.OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </Style.OverviewItem>
            <Style.OverviewItem>
              <span>Price:</span>
              {tickersLoading ? (
                "Loading"
              ) : (
                <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
              )}
            </Style.OverviewItem>
          </Style.Overview>
          <Style.Description>{infoData?.description}</Style.Description>
          <Style.Overview>
            <Style.OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </Style.OverviewItem>
            <Style.OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </Style.OverviewItem>
          </Style.Overview>

          <Style.Tabs>
            <Style.Tab isActive={candleStickMatch !== null}>
              <Link to={`/${coinId}/candleStick`}>CandleStick</Link>
            </Style.Tab>

            <Style.Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Style.Tab>

            <Style.Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Style.Tab>
          </Style.Tabs>

          <Switch>
            <Route path={`/:coinId/candleStick`}>
              <CandleStick isDark={isDark} coinId={coinId} />
            </Route>
            <Route path={`/:coinId/price`}>
              <Price tickersData={tickersData} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart isDark={isDark} coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Style.Container>
  );
}

export default Coin;
