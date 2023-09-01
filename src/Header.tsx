import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface IHeaderProps {
  toggleTheme: () => void;
}

function Header({ toggleTheme }: IHeaderProps) {
  return (
    <BtnWrap>
      <HomeBtn>
        <Link to={"/"}>HOME</Link>
      </HomeBtn>
      <ThemeBtn onClick={toggleTheme}>THEME</ThemeBtn>
    </BtnWrap>
  );
}

export default Header;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const HomeBtn = styled.button`
  border: none;
  font-size: 12px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${props => props.theme.boxColor};
  a {
    color: ${props => props.theme.textColor};
    &:hover,
    :active {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const ThemeBtn = styled.button`
  border: none;
  font-size: 12px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.textColor};
  &:hover,
  :active {
    color: ${props => props.theme.accentColor};
  }
`;
