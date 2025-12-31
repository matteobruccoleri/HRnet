import styled from "styled-components";
import PropTypes from "prop-types";

function Title({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;

const StyledTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 500;
  color: #046961;
`;