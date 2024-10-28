const Button = ({ onClick, children, disabled = false, type = "button" }) => {
  return (
    <button
      className={`btn ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
