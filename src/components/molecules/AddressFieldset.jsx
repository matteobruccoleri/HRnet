import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Field from "../atoms/FormField";
import Select from "../atoms/Select";
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
      <Field>
        <Label htmlFor="street">Street</Label>
        <Input id="street" />
      </Field>
      <Field>
        <Label htmlFor="city">City</Label>
        <Input id="city" />
      </Field>
      <Field>
        <Label htmlFor="state">State</Label>
        <Select id="state" options={STATES} />
      </Field>
      <Field>
        <Label htmlFor="zip-code">Zip Code</Label>
        <Input id="zip-code" type="number" />
      </Field>
    </StyledFieldSet>
  );
}

const StyledFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: none;
  width: 100%;
  padding: 10px 0 0 0;

  legend {
    padding-top: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.75);
  }
`;
