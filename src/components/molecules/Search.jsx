import styled from "styled-components";
import Input from "../atoms/Input";



function SearchInput({ value, onChange, placeholder = "Search…" }) {
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

export default SearchInput;

// Styled components

const StyledInput = styled.input`
  width: 100%;
  padding: 6px;
  border-radius: 0.5rem;
  border: 1px solid #00000044;

  @media (min-width: 425px) {
    width: 300px;
  }
`;