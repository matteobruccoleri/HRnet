import styled from "styled-components";
import PropTypes from "prop-types";

function Label({ htmlFor, children, required = false, className }) {
  return (
    <StyledLabel htmlFor={htmlFor} className={className}>
      {children}
    </StyledLabel>
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Label;

const StyledLabel = styled.label`
  color: #078f84ff;
  font-weight: 500;
  font-size: 1.1rem;
`;
