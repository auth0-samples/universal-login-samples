type ErrorMessageProps = {
    errors?: Array<{ message: string }>;
  };
  
  export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
    if (!errors?.length) return null;
  
    return (
      <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {errors.map((error, index) => (
          <p key={index} className="block sm:inline">{error.message}</p>
        ))}
      </div>
    );
  };