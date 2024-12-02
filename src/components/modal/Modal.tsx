import { Dialog } from "../ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, setOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children}
    </Dialog>
  );
};

export default Modal;
