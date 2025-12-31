import styled from "styled-components";
import PropTypes from "prop-types";

function Search({ value, onChange, placeholder = "Search…" }) {
  return (
      <StyledInput
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Search;

// Styled components

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 0.6rem;
  border: 1px solid #d9d9d9;
  background: #fdfdfd;
  font-weight: 400;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.75);
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(0, 0, 0, 0.38);
  }

  &:hover {
    border-color: #bfc5c5;
    background-color: #fff;
  }

  &:focus {
    outline: none;
    border-color: #058b80;
    box-shadow: 0 0 0 3px rgba(5, 139, 128, 0.15);
    background-color: #fff;
  }

  @media (min-width: 425px) {
    width: 400px;
  }
`;