import React from 'react';
import '../../styles/mixins.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button className="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;