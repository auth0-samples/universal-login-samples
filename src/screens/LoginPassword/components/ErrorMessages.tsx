import React from 'react';

interface ErrorMessagesProps {
  errors: Array<{ message: string }>;
}

export const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => (
  <div className="error-container">
    {errors.map((error, index) => (
      <p key={index}>{error?.message}</p>
    ))}
  </div>
); 