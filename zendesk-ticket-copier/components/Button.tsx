interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
  }
  
  const Button = ({ onClick, children }: ButtonProps) => {
    return (
      <button 
        onClick={onClick} 
        className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {children}
      </button>
    );
  }
  
  export default Button;
  