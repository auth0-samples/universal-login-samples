interface Error {
  message?: string;
}

interface ErrorMessagesProps {
  errors?: Error[] | null;
}

export const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => (
  <div className="error-container">
    {errors?.map((error, index) => (
      <p key={index}>{error?.message}</p>
    ))}
  </div>
); 