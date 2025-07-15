import React from 'react';
import Button from '../../../components/Button';

interface Connection {
  name: string;
}

interface FederatedLoginProps {
  connections?: Connection[];
  onFederatedLogin: (name: string) => void;
}

export const FederatedLogin: React.FC<FederatedLoginProps> = ({ connections, onFederatedLogin }) => (
  <div className="federated-login-container">
    {connections?.map((connection) => (
      <Button
        key={connection.name}
        onClick={() => onFederatedLogin(connection.name)}
      >
        Continue with {connection.name}
      </Button>
    ))}
  </div>
);