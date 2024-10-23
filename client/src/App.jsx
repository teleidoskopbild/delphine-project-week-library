import { Outlet } from "react-router-dom";
import { UserContext } from "./context/userContext.js";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {" "}
      <>
        <p>Hello Word!</p>
        <p>Test Task from Ralf</p>
        <Outlet></Outlet>
      </>
    </UserContext.Provider>
  );
}

export default App;
