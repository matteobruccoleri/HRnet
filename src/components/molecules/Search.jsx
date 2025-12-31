import styled from "styled-components";
import PropTypes from "prop-types";
import Input from "../atoms/Input";

function Search({ value, onChange, placeholder = "Search…" }) {
  return (
    <SearchWrapper>
      <Input
        id="search"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
        required={false}
      />
    </SearchWrapper>
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Search;

// Styled components

const SearchWrapper = styled.div`
  width: 100%;

  @media (min-width: 425px) {
    width: 400px;
  }

  input {
    border-radius: 0.8rem;
  }
`;