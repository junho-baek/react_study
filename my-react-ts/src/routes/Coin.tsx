import { useState } from "react";
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
  className: "px-5 max-w-[480px] mx-auto",
})``;

const Header = styled.header.attrs({
  className: "h-[15vh] flex justify-center items-center flex-col",
})``;
const Img = styled.img.attrs({
  className: "w-[35px] h-[35px] mr-[10px]",
})``;

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams(); // 파라미터는 어차피 스트링이다. url 에서 가져오기 때문이지<div className=""></div>
  const { state } = useLocation();
  return (
    <Container>
      <Header>
        <Img src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`} />
        <Title>{`${state?.name} (${state?.id})`}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
