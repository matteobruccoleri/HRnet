import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import closeIcon from "../assets/close.svg";

const POSITION_STYLES = {
  center: { align: "center", justify: "center" },
  "top-left": { align: "flex-start", justify: "flex-start" },
  "top-right": { align: "flex-start", justify: "flex-end" },
  "bottom-left": { align: "flex-end", justify: "flex-start" },
  "bottom-right": { align: "flex-end", justify: "flex-end" },
  "top-center": { align: "flex-start", justify: "center" },
  "bottom-center": { align: "flex-end", justify: "center" },
};

function SmartModal({
  open,
  onOpenChange,
  onClose,
  position = "center",
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  rootClassName = "",
  contentClassName = "",
  backdropClassName = "",
  children,
}) {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(open);

  const { align, justify } = useMemo(
    () => POSITION_STYLES[position] || POSITION_STYLES.center,
    [position]
  );

  const handleClose = useCallback(() => {
    onClose?.();
    onOpenChange?.(false);
  }, [onClose, onOpenChange]);

  // Gérer l'ouverture / fermeture avec animation
  useEffect(() => {
    if (open) {
      setIsMounted(true);
      // Laisser une frame pour permettre aux transitions CSS de se déclencher
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [open]);

  // Gérer la touche Escape
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    if (typeof document === "undefined") return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEsc, handleClose]);

  // Quand l'animation de fade/scale est terminée, on démonte si besoin
  const handleContentTransitionEnd = () => {
    if (!open) {
      setIsMounted(false);
    }
  };

  if (!isMounted) return null;
  if (typeof document === "undefined") return null; // SSR safety

  const rootClasses = [
    "sm-modal-root",
    isVisible ? "sm-modal-root--visible" : "",
    rootClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [
    "sm-modal-content",
    `sm-modal-content--${position}`,
    contentClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const backdropClasses = ["sm-modal-backdrop", backdropClassName]
    .filter(Boolean)
    .join(" ");

  const handleRootClick = () => {
    if (showBackdrop && closeOnBackdropClick) {
      handleClose();
    }
  };

  const modal = (
    <Root
      className={rootClasses}
      $align={align}
      $justify={justify}
      $visible={isVisible}
      onClick={handleRootClick}
    >
      {showBackdrop && (
        <Backdrop
          className={backdropClasses}
          $visible={isVisible}
        />
      )}

      <Content
        className={contentClasses}
        $visible={isVisible}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleContentTransitionEnd}
        role={showBackdrop ? "dialog" : "status"}
        aria-modal={showBackdrop || undefined}
      >
        {showCloseButton && (
          <CloseButton
            type="button"
            aria-label="Close modal"
            onClick={handleClose}
          >
          <CloseIcon src={closeIcon} alt="Close modal" />
          </CloseButton>
        )}
        <ContentText>{children}</ContentText>
      </Content>
    </Root>
  );

  return createPortal(modal, document.body);
}

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 16px;
  display: flex;
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 300ms ease;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 300ms ease;
`;

const Content = styled.div`
  position: relative;
  min-width: 300px;
  max-width: 460px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 20px 50px rgba(5, 2, 2, 0.2);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "8px")})
  scale(${({ $visible }) => ($visible ? 1 : 0.80)});
  transition: opacity 150ms ease, transform 150ms ease;
`;

const ContentText = styled.div`
  padding: 5px;
`

const CloseButton = styled.button`
  margin-left: auto;
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 5px;
  background-color: transparent;
  transition: 0.2s ease;

  &:hover {
    background-color: #f8f8f8ff;
    border: 1px solid #ccc;
  }
`;

const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export default SmartModal;
