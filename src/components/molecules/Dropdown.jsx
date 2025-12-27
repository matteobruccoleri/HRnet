import styled from "styled-components";

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