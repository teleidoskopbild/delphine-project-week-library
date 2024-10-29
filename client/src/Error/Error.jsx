import "../Error/Error.css";

function Error({ message, type = "error" }) {
  if (!message) return null;

  return (
    <div className={`error-message ${type}`}>
      {" "}
      {/*  Apply type class */}
      <p>{message}</p>
    </div>
  );
}

export default Error;
