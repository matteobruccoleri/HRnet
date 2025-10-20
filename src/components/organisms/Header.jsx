import logo from "../../assets/logo_wealth_health.png";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <StyledHeader>
      <Link to="/">
        <Logo src={logo} alt="logo wealth health"/>
        HRnet
      </Link>
      <Nav>
        {onHome ? (
          <Link to="/employees">View Current Employees</Link>
        ) : (
          <Link to="/">Home</Link>
        )}
      </Nav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #5A6F07;
  background-color: #efefef;
`;

const Logo = styled.img`
  height: 60px;
`;

const Title = styled.h1`
  font-size: 16px;
  margin: 0;
  color: #5A6F09;
`;

const Nav = styled.nav`
  a {
    color: #5b6f09d8;
    font-weight: 500;
  }
  a:hover {
    color: #5b6f09ff;
  }
`;

export default Header;
