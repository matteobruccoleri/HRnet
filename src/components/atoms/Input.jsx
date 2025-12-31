import styled from "styled-components";
import PropTypes from "prop-types";

function Input({id, type = "text", required = true, ...props }) {
  return (
      <StyledInput id={id} name={id} type={type} required={required} {...props} />
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 0.6rem;
  background: #fdfdfd;
  font-weight: 400;
  font-size: 1rem;
  width: 100%;
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

  /* Amélioration pour les inputs de type date */
  &[type="date"] {
    cursor: pointer;
    position: relative;

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  /* Amélioration pour les inputs de type number */
  &[type="number"] {
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;