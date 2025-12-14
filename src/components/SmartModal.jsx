import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

// SVG inline → évite de dépendre d’un fichier importé (meilleur pour npm)
const CloseSvg = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
      fill="currentColor"
    />
  </svg>
);

// Map des positions -> flex align/justify
const POSITION_STYLES = {
  center: { align: "center", justify: "center" },
  "top-left": { align: "flex-start", justify: "flex-start" },
  "top-right": { align: "flex-start", justify: "flex-end" },
  "bottom-left": { align: "flex-end", justify: "flex-start" },
  "bottom-right": { align: "flex-end", justify: "flex-end" },
  "top-center": { align: "flex-start", justify: "center" },
  "bottom-center": { align: "flex-end", justify: "center" }
};

/**
 * SmartModal affiche une modale/toast React basée sur styled-components.
 * - Contrôlée via `open`
 * - Animation fade + scale (0.8 -> 1 à l’ouverture ; 1 -> 0.8 à la fermeture)
 * - Fermeture via Escape, clic backdrop, bouton close (optionnel)
 * - Position configurable (center, bottom-right, etc.)
 *
 * @param {Object} props
 * @param {boolean} props.open - État contrôlé d'ouverture (true = visible).
 * @param {(isOpen: boolean) => void} [props.onOpenChange] - Callback pour synchroniser l'état avec le parent.
 * @param {() => void} [props.onClose] - Callback déclenché lors d'une fermeture.
 * @param {"center"|"top-left"|"top-right"|"bottom-left"|"bottom-right"|"top-center"|"bottom-center"} [props.position="center"] - Position de la modale.
 * @param {boolean} [props.showBackdrop=true] - Affiche un backdrop (modal) ou non (toast).
 * @param {boolean} [props.closeOnBackdropClick=true] - Ferme au clic backdrop (si showBackdrop=true).
 * @param {boolean} [props.closeOnEsc=true] - Ferme avec la touche Escape.
 * @param {boolean} [props.showCloseButton=true] - Affiche le bouton de fermeture.
 * @param {string} [props.rootClassName=""] - Classe additionnelle pour le root overlay.
 * @param {string} [props.contentClassName=""] - Classe additionnelle pour le contenu.
 * @param {string} [props.backdropClassName=""] - Classe additionnelle pour le backdrop.
 * @param {import("react").ReactNode} props.children - Contenu affiché.
 */
export function SmartModal({
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
  children
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

  // Ouverture / fermeture avec animation
  useEffect(() => {
    if (open) {
      setIsMounted(true);
      if (typeof window !== "undefined") {
        requestAnimationFrame(() => setIsVisible(true));
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [open]);

  // Escape
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    if (typeof document === "undefined") return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEsc, handleClose]);

  // À la fin de l’animation de fermeture, on démonte
  const handleTransitionEnd = () => {
    if (!open) setIsMounted(false);
  };

  if (!isMounted) return null;
  if (typeof document === "undefined") return null; // SSR safety

  const rootClasses = ["sm-modal-root", isVisible ? "sm-modal-root--visible" : "", rootClassName]
    .filter(Boolean)
    .join(" ");

  const contentClasses = ["sm-modal-content", `sm-modal-content--${position}`, contentClassName]
    .filter(Boolean)
    .join(" ");

  const backdropClasses = ["sm-modal-backdrop", backdropClassName].filter(Boolean).join(" ");

  const handleRootClick = () => {
    if (showBackdrop && closeOnBackdropClick) handleClose();
  };

  const isToast = !showBackdrop;

  const modal = (
    <Root
      className={rootClasses}
      $align={align}
      $justify={justify}
      $visible={isVisible}
      onClick={handleRootClick}
    >
      {showBackdrop && <Backdrop className={backdropClasses} $visible={isVisible} />}

      <Content
        className={contentClasses}
        $visible={isVisible}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
        role={isToast ? "status" : "dialog"}
        aria-modal={isToast ? undefined : true}
        aria-live={isToast ? "polite" : undefined}
      >
        {showCloseButton && (
          <CloseButton type="button" aria-label="Close modal" onClick={handleClose}>
            <CloseIcon aria-hidden="true">
              <CloseSvg />
            </CloseIcon>
          </CloseButton>
        )}

        <ContentBody>{children}</ContentBody>
      </Content>
    </Root>
  );

  return createPortal(modal, document.body);
}

// styled-components

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
  transition: opacity 200ms ease;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 200ms ease;
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
  transform: scale(${({ $visible }) => ($visible ? 1 : 0.8)});
  transition: opacity 200ms ease, transform 200ms ease;
`;

const ContentBody = styled.div`
  padding: 5px;
`;

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

const CloseIcon = styled.span`
  display: inline-flex;
  width: 20px;
  height: 20px;
  color: #111;
`;

export default SmartModal;
