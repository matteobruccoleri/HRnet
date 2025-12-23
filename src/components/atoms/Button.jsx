import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 15px 25px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: #1b453d;
  color: #fff;
  transition: all 0.2s ease;
  transform: translateY(0);

    &:hover {
      background-color: #046961;
      transform: translateY(-2px);
    }

    &:disabled {
      background-color: #e3e3e3d1;
      color: #ccc;
      cursor: not-allowed;
      transform: none;
    }
`;

function Button({ children, ...props }) {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
