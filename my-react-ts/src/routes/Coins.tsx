import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div.attrs({
  className: "p-4 max-w-[480px] m-auto",
})``;

const Header = styled.header.attrs({
  className: "h-[15vh] flex justify-center items-center",
})``;

const CoinsList = styled.ul``;

const Coin = styled.li.attrs({
  className: "bg-white rounded-[15px] mb-[10px]",
})`
  color: ${(props) => props.theme.bgColor};
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img.attrs({
  className: "w-[35px] h-[35px] mr-[10px]",
})``;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); // 비어있는 배열을 넣어주면 컴포넌트가 마운트 될때 한번만 실행된다.
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name, id: coin.id }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
