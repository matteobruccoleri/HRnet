import styled from "styled-components";
import PropTypes from "prop-types";

function Input({ label, id, type = "text", required = true, ...props }) {
  return (
    <Field>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} name={id} type={type} required={required} {...props} />
    </Field>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  label {
    font-weight: 400;
    font-size: 1.1rem;
  }

  input {
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 0.6rem;
    background: #fdfdfd;
    font-weight: 400;
    font-size: 1rem;

  }
`;