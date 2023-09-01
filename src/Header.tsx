import { Link } from "react-router-dom";
import * as Style from "./styles/Header";

interface IHeaderProps {
  toggleTheme: () => void;
}

function Header({ toggleTheme }: IHeaderProps) {
  return (
    <Style.BtnWrap>
      <Style.HomeBtn>
        <Link to={"/"}>HOME</Link>
      </Style.HomeBtn>
      <Style.ThemeBtn onClick={toggleTheme}>THEME</Style.ThemeBtn>
    </Style.BtnWrap>
  );
}

export default Header;
