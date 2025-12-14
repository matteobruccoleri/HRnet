import { useState } from "react";
import Input from "./atoms/Input";
import Dropdown from "./atoms/Dropdown";
import AddressFieldset from "./molecules/AddressFieldset";
import Modal from "./SmartModal";
import Button from "./atoms/Button";
import { useEmployeesDispatch } from "../state/EmployeesStore";
import icon from "../assets/user.svg";
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
  const dispatch = useEmployeesDispatch();

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
      dateOfBirth: data["date-of-birth"],
      startDate: data["start-date"],
      department: data["department"],
      street: data["street"],
      city: data["city"],
      state: data["state"],
      zipCode: data["zip-code"],
    };

    // Mise à jour du state global via Context+Reducer
    dispatch({ type: "ADD_EMPLOYEE", payload: employee });

    // UI
    setOpen(true);
    e.currentTarget.reset();
  }

  return (
    <>
      <Form id="create-employee" onSubmit={handleSubmit}>
        <Input label="First Name" id="first-name" />
        <Input label="Last Name" id="last-name" />
        <Input label="Date of Birth" id="date-of-birth" type="date" />
        <Input label="Start Date" id="start-date" type="date" />

        <AddressFieldset />

        <Dropdown
          label="Department"
          id="department"
          options={DEPARTMENTS.map((dep) => ({ label: dep, value: dep }))}
        />

        <Button type="submit">Save</Button>
      </Form>

      <Modal open={open} onOpenChange={setOpen}>
        <Message>
          <Icon src={icon} alt="User icon" />
          Employee Created!
        </Message>
      </Modal>
    </>
  );
}

const Form = styled.form`
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 15px;
  width: 100%;
  box-shadow: 0px 0px 25px 0px rgba(0, 76, 158, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: end;

  @media (min-width: 425px) {
    width: 400px;
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

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
