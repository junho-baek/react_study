import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "text-[48px] w-full",
})`
  color: ${(props) => props.theme.accentColor};
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

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams(); // 파라미터는 어차피 스트링이다. url 에서 가져오기 때문이지<div className=""></div>
  const { state } = useLocation();
  const [info, setInfo] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(
          `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
        )
      ).json();
      const priceData = await (
        await fetch(
          `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
        )
      ).json();
      console.log(price, info);
      setInfo(infoData);
      setPrice(priceData);
      console.log(infoData, priceData);
      setLoading(false);
    })(); // 함수를 선언과 동시에 호출하는 것이다. ()() 이게 핵심.
  }, []);

  return (
    <Container>
      <Header>
        <Img
          className=""
          src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`}
        />
        <Title className="mb-[10px] text-center">{`${
          state?.name || "Loading..."
        }`}</Title>
      </Header>
      {loading ? (
        <>
          <Loader className="text-center mt-[100px] mb-[30px] animate-pulse">
            loding..
          </Loader>
          <Loader className=" animate-spin text-[100px] w-auto">↻</Loader>
        </>
      ) : null}
    </Container>
  );
}
export default Coin;
