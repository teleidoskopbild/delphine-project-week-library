import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <Outlet></Outlet>
    </>
  );
}

export default App;
