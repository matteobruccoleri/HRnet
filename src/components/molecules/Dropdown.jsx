import styled from "styled-components";
import PropTypes from "prop-types";

function Dropdown({ label, id, options = [], required = true }) {
  return (
    <Field>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} required={required} defaultValue="">
        <option value="" disabled>Choose…</option>
        {options.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </Field>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ])
  ),
  required: PropTypes.bool,
};

export default Dropdown;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  width: 100%;
  background: #fdfdfd;

  label {
    padding-top: 10px;
    font-size: 1.2rem;
    font-weight: 500;
  }

  select {
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 0.6rem;
    background-color: #fdfdfd;
    font-size: 1rem;
    font-weight: 400;
  }
`;