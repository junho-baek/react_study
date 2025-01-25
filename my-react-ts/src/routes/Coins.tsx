import styled from "styled-components";

// styled-components를 사용하여 h1 태그를 스타일링한 Title 컴포넌트
// theme에서 정의된 accentColor를 글자색으로 사용
const Title = styled.h1.attrs({
  className: "text-4xl font-bold",
})`
  color: ${(props) => props.theme.accentColor};
`;

function Coins() {
  return <Title>코인</Title>;
}
export default Coins;
