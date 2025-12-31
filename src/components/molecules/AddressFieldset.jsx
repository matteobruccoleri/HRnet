import Input from "../atoms/Input";
import Dropdown from "../molecules/Dropdown";
import styled from "styled-components";

const STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
];

export default function AddressFieldset() {
  return (
    <StyledFieldSet>
      <legend>Address</legend>
      <Input label="Street" id="street" />
      <Input label="City" id="city" />
      <Dropdown label="State" id="state" options={STATES} />
      <Input label="Zip Code" id="zip-code" type="number" />
    </StyledFieldSet>
  );
}

const StyledFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: none;
  width: 100%;
  padding: 10px 0; 

  legend {
    padding-top: 10px;
    font-size: 1.2rem;
    font-weight: 500;
  }

  label {
    padding-top: 0px;
    font-size: 1.1rem;
    font-weight: 400;
  }
`