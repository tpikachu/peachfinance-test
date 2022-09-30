import styled from 'styled-components';
import Button from './Button';

interface IModalProps {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
}

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  width: 50%;
  min-width: 150px;
  max-width: 200px;

  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
`;

const HModal: React.FC<React.PropsWithChildren<IModalProps>> = ({
  className,
  children,
  onClose,
}) => {
  return (
    <div className={className}>
      <ModalContent>
        <Button type="Close" onClick={onClose}>
          &times;
        </Button>
        {children}
      </ModalContent>
    </div>
  );
};

const Modal = styled(HModal)`
  display: ${(props) => (props.visible ? 'blokc' : 'none')};
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export default Modal;
