import { useParams } from "react-router";

function Coin() {
  const { coinId } = useParams(); // 파라미터는 어차피 스트링이다. url 에서 가져오기 때문이지<div className=""></div>
  return <h1>Coin: {coinId}</h1>;
}
export default Coin;
