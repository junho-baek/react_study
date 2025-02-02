import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "text-[48px] w-full",
})`
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Loader = styled.span.attrs({
  className: "text-center block",
})``;

const Container = styled.div.attrs({
  className: "px-5 max-w-[480px] mx-auto h-screen",
})``;

const Header = styled.header.attrs({
  className: "h-[20vh] flex justify-center items-center flex-col ",
})``;
const Img = styled.img.attrs({
  className: "w-[50px] h-[50px] my-[40px]",
})``;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams(); // 파라미터는 어차피 스트링이다. url 에서 가져오기 때문이지<div className=""></div>
  const { state } = useLocation();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceInfo, info);
      setInfo(infoData);
      setPriceInfo(priceData);
      console.log(infoData, priceData);
      setLoading(false);
    })(); // 함수를 선언과 동시에 호출하는 것이다. ()() 이게 핵심.
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Img
          className=""
          src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`}
        />
        <Title className="mb-[10px] text-center">
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <>
          <Loader className="text-center mt-[100px] mb-[30px] animate-pulse">
            loding..
          </Loader>
          <Loader className=" animate-spin text-[100px] w-auto">↻</Loader>
        </>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>순위:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>가격:</span>
              <span>${priceInfo?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>

          <Description>{info?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>총 공급량:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 공급량:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <div className="flex gap-4 justify-center items-center mb-4 mt-8">
            <Link
              to="chart"
              className="bg-[rgba(0,0,0,0.5)] px-6 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.7)] transition-colors"
            >
              차트
            </Link>
            <div className="w-[1px] h-[20px] bg-gray-500 opacity-50"></div>
            <Link
              to="price"
              className="bg-[rgba(0,0,0,0.5)] px-6 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.7)] transition-colors"
            >
              가격
            </Link>
          </div>
          <Outlet />
        </>
      )}
    </Container>
  );
}
export default Coin;
