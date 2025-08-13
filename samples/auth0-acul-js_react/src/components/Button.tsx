import React from 'react';
import '../styles/mixins.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, id }) => (
  <button id={id} className="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;