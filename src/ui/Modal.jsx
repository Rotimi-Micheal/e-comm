import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const value = { open, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function Open({ children }) {
  const { open, openModal } = useModalContext();

  return cloneElement(children, { onClick: () => openModal() });
}

function Window({ children }) {
  //   const modalRef = useRef();
  const { open, closeModal } = useModalContext();
  const { ref: modalRef } = useOutsideClick(closeModal);

  if (!open) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-[999] flex h-screen  w-full flex-col items-center justify-center backdrop-blur-lg">
      <div className="mx-auto max-w-5xl" ref={modalRef}>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function useModalContext() {
  const useModal = useContext(ModalContext);

  return useModal;
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
