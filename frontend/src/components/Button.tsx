import React from 'react';
import styled from 'styled-components';

interface IButtonProps {
  type?: string;
  disabled?: boolean;
  className?: string;
  hasBoarder?: boolean;
  isText?: boolean;
  onClick?: () => void;
}

const HButton: React.FC<React.PropsWithChildren<IButtonProps>> = ({
  className,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

const Button = styled(HButton)`
  color: ${(props) => {
    if (props.disabled) {
      return 'grey';
    }
    switch (props.type) {
      case 'Add':
        return '#90EE90';
      case 'Edit':
        return '#F9E076';
      case 'Delete':
        return '#D21404';
      case 'Close':
      case 'Cancel':
        return 'grey';
      case 'Save':
        return 'green';
      default:
        return 'white';
    }
  }};

  pointer-events: ${(props) => (props.disabled ? 'none' : 'normal')};
  border: ${(props) => (props.hasBoarder ? '1px solid white' : 'none')};
  border-radius: 100px;
  font-size: ${(props) => (props.isText ? '1em' : '1.5em')};
  background: transparent;

  &:hover {
    transform: scale(1.08);
  }

  transition: all 0.1s ease-out;
`;

export default Button;
