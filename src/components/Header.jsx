import styled from "styled-components";
import { Link } from "react-router-dom";

//import Navbar from "./NavBar";

const StyledHeader = styled.header`
  padding: 20px;
  background-color: #efefef;
`;

const Title = styled.h1`
  font-size: 16px;

`;

function Header() {
  return (
    <StyledHeader>
        <Link to="/">
          <Title>HRnet</Title>
        </Link>
    </StyledHeader>
  );
}

export default Header;