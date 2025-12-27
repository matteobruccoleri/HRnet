import { useEffect, useRef } from "react";
import styled from "styled-components";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" />
  </svg>
);

export default function Modal({ open, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <StyledDialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault(); // Escape
        onClose();
      }}
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) {
          onClose(); // clic backdrop
        }
      }}
    >
      <CloseButton type="button" onClick={onClose} aria-label="Close modal">
        <CloseIcon />
      </CloseButton>

      {children}
    </StyledDialog>
  );
}


//Styles Components
const StyledDialog = styled.dialog`
  position: fixed;
  z-index: 999;
  border: none;
  border-radius: 10px;
  padding: 16px;
  width: 400px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);

  &::backdrop {
    background: rgba(0, 0, 0, 0.45);
  }
`

const CloseButton = styled.button`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  cursor: pointer;
  padding: 4px;
  line-height: 0;
  color: #7e7e7eff;

  &:hover {
    opacity: 0.7;
  }
`