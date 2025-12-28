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

  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;