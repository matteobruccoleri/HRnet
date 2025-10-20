import styled from "styled-components";
import EmployeeForm from "../components/EmployeeForm";
import Title from "../components/atoms/Title";

export default function Home() {
  return (
    <>
      <Container>
        <Title>Create Employee</Title>
        <EmployeeForm />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (min-width: 425px) {
    width: auto;
  }
  
`