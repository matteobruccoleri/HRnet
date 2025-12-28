import styled from "styled-components";
import EmployeeForm from "../components/organisms/EmployeeForm";
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
  align-items: center;
  gap: 20px;

  @media (min-width: 425px) {
    width: 100%;
  }
  
`