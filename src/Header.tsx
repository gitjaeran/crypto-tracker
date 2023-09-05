import { Link } from "react-router-dom";
import * as Style from "./styles/Header";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

function Header() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDartAtom = () => setDarkAtom(prev => !prev);

  return (
    <Style.BtnWrap>
      <Style.HomeBtn>
        <Link to={"/"}>HOME</Link>
      </Style.HomeBtn>
      <Style.ThemeBtn onClick={toggleDartAtom}>THEME</Style.ThemeBtn>
    </Style.BtnWrap>
  );
}

export default Header;
