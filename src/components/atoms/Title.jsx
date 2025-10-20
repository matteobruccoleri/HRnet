import styled from "styled-components";

function Title({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

export default Title;

const StyledTitle = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 500;
  color: #939b6b;
`;