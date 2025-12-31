import { useState } from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import FormField from "../atoms/FormField";
import DatePicker from "../atoms/DatePicker";
import Select from "../atoms/Select";
import AddressFieldset from "../molecules/AddressFieldset";
//import Modal from "../Modal";
import { Modal } from "@matteob10/modal-react";
import Button from "../atoms/Button";
import { useEmployeesContext } from "../../store/EmployeesContext";
import styled from "styled-components";

const DEPARTMENTS = [
  "Sales",
  "Marketing",
  "Engineering",
  "Human Resources",
  "Legal",
];

export default function EmployeeForm() {
  const [open, setOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const { addEmployee } = useEmployeesContext();

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    const employee = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      firstName: data["first-name"],
      lastName: data["last-name"],
      dateOfBirth: dateOfBirth ? dateOfBirth.toLocaleDateString("en-US") : "",
      startDate: startDate ? startDate.toLocaleDateString("en-US") : "",
      department: data["department"],
      street: data["street"],
      city: data["city"],
      state: data["state"],
      zipCode: data["zip-code"],
    };

    // Ajout de l'employé au state global via Context
    addEmployee(employee);

    // UI
    setOpen(true);
    e.currentTarget.reset();
    setDateOfBirth(null);
    setStartDate(null);
  }

  return (
    <>
      <Form id="create-employee" onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" />
        </FormField>

        <FormField>
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" />
        </FormField>

        <FormField>
          <Label htmlFor="date-of-birth">Date of Birth</Label>
          <DatePicker
            id="date-of-birth"
            selected={dateOfBirth}
            onChange={setDateOfBirth}
            placeholder="dd/mm/yyyy"
          />
        </FormField>

        <FormField>
          <Label htmlFor="start-date">Start Date</Label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={setStartDate}
            placeholder="dd/mm/yyyy"
          />
        </FormField>

        <AddressFieldset />

        <FormField>
          <Label htmlFor="department">Department</Label>
          <Select
            id="department"
            options={DEPARTMENTS.map((dep) => ({ label: dep, value: dep }))}
          />
        </FormField>

        <Button type="submit">Save</Button>
      </Form>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Message>
          Employee Created!
        </Message>
      </Modal>
    </>
  );
}

const Form = styled.form`
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #d8d8d8;
  padding: 15px;
  width: 100%;
  box-shadow: 0px 0px 25px 0px rgba(0, 76, 158, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: end;

  @media (min-width: 475px) {
    width: 450px;
    padding: 20px;
  }
  
  button {
    margin-top: 20px;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: #0000007c;
  line-height: 100%;
`;

