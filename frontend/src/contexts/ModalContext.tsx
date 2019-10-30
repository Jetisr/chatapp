import React, { useState, useContext, useRef } from "react";

interface ModalState {
  title: string;
  open: boolean;
  onCancel: () => void;
}

interface ConfirmModal extends ModalState {
  type: "CONFIRM";
  description: string;
  onConfirm: () => void;
}

interface FormModal extends ModalState {
  type: "FORM";
  initialValue: string;
  onConfirm: (finalInputValue: string) => void;
}

type ModalTypes = FormModal | ConfirmModal;

const initialState: ConfirmModal = {
  type: "CONFIRM",
  description: "",
  open: false,
  title: "",
  onConfirm: () => {},
  onCancel: () => {}
};

const ModalContext = React.createContext<{
  modalState: ModalTypes;
  setModalState: React.Dispatch<React.SetStateAction<ModalTypes>>;
}>({
  modalState: initialState,
  setModalState: () => {}
});

const ModalProvider: React.FunctionComponent = ({ children }) => {
  const [modalState, setModalState] = useState<ModalTypes>(initialState);
  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const awaitingConfirmRef = useRef<{
    resolve: () => void;
    reject: () => void;
  }>();
  const { modalState, setModalState } = useContext(ModalContext);

  const closeModal = () => {
    setModalState(currentState => ({ ...currentState, open: false }));
  };

  const confirm = async (
    options: Omit<ConfirmModal, "open" | "type" | "onCancel" | "onConfirm">
  ) => {
    const onCancel = () => {
      if (awaitingConfirmRef.current) {
        awaitingConfirmRef.current.reject();
      }
    };
    const onConfirm = () => {
      if (awaitingConfirmRef.current) {
        awaitingConfirmRef.current.resolve();
      }
    };
    setModalState({
      ...options,
      open: true,
      type: "CONFIRM",
      onCancel,
      onConfirm
    });
    try {
      await new Promise((resolve, reject) => {
        awaitingConfirmRef.current = { resolve, reject };
      });
      closeModal();
      return true;
    } catch {
      closeModal();
      return false;
    }
  };

  const form = async (
    options: Omit<FormModal, "open" | "onCancel" | "type" | "onChange">
  ) => {
    const handleConfirm = (formValue: string) => {
      closeModal();
      options.onConfirm(formValue);
    };
    setModalState({
      ...options,
      open: true,
      onCancel: closeModal,
      type: "FORM",
      onConfirm: handleConfirm
    });
  };

  return { confirm, modalState, form };
};

export { useModal, ModalProvider };
