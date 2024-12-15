interface AlertProps {
    message: string;
  }
  
  const Alert = ({ message }: AlertProps) => {
    return (
      <div className="alert bg-green-500 text-white p-4 rounded mb-4">
        {message}
      </div>
    );
  }
  
  export default Alert;
  