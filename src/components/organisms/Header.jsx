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

export default Header;

const StyledHeader = styled.header`
  position: sticky;
  z-index: 999;
  top: 0;
  background-color: #f9f9f9;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  box-shadow: 0px -10px 25px 0px rgba(0, 76, 158, 0.3);

  a {
    font-size: 14px;
    color: #1b453d;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 425px) {
    padding: 15px 30px;
    a {
      font-size: 22px;
    }
  }
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  a {
    color: #f9f9f9;
    font-weight: 500;
    border-radius: 10px;
    background-color: #1b453d;
    padding: 10px 20px;
    font-size: 12px;
    transition: 0.2s ease-out;
    transform: translateY(0px);

    @media (min-width: 425px) {
      font-size: 14px;
    }
  }
  a:hover {
    transform: translateY(-2px);
    background-color: #046961;
  }
`;


