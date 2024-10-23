import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { UserContext } from "./context/userContext.js";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <>
        <NavBar />
        <Outlet></Outlet>
      </>
    </UserContext.Provider>
  );
}

export default App;
