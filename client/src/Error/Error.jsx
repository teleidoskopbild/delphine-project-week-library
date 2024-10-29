// Error.jsx

function Error({ message }) {
  if (!message) return null; // Return null if there's no error message to display
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
}

export default Error;
