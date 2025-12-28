import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
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

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <StyledDialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault(); // fermeture via Escape
        onClose();
      }}
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) {
          onClose(); // clic sur le backdrop
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

/* ===== PropTypes ===== */

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

/* ===== Styles ===== */

const StyledDialog = styled.dialog`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 16px;
  width: 400px;
  max-width: calc(100vw - 5%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);

  &::backdrop {
    background: rgba(0, 0, 0, 0.45);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 5px;
  color: #b3b3b3;
  border-radius: 0.4rem;
  transition: 0.2s ease;

  svg {
    vertical-align: middle;
  }

  &:hover {
    background: #ebebeb;
    color: #a1a1a1;
  }
`;
