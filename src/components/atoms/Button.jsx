import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;

  background: ${({ variant }) =>
    variant === "secondary" ? "#f2f4f8" : "#efefef"};
    color: ${({ variant }) => (variant === "secondary" ? "#1f2d3d" : "#5A6F07")};
    border: 1px solid #5A6F07;

    transition: all 0.15s ease;

    &:hover {
      background-color: #ebebeb;
    }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

function Button({ children, variant = "primary", ...props }) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
