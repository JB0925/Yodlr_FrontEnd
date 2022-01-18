import { useRef } from "react";
import { UserProvider } from "./useYodlrContext";
import "./App.css";
import Routes from "./Components/Routes";
import Sidebar from "./Components/Sidebar";

function App() {
  const sidebarRef = useRef();

  const toggleSidebar = () => {
    sidebarRef.current.classList.toggle("sidebar-open");
  };

  return (
    <div className="App">
      <h1 id="yodlr-logo">Yodlr!</h1>
      <i id="burgerMenu" className="fas fa-bars" onClick={toggleSidebar}></i>
      <div className="sidebar-parent" ref={sidebarRef}>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <UserProvider>
        <Routes />
      </UserProvider>
    </div>
  );
}

export default App;
