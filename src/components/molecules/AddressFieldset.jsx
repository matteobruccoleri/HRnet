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
  border: 1px solid #cbcbcb;
  border-radius: 8px;
  width: 100%; 
`