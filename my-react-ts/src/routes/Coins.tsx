import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
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
  const { isLoading, data, error } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  if (error) return <span>에러가 발생했습니다</span>;

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
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
