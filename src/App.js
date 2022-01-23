import { useRef } from "react";
import { UserProvider } from "./useYodlrContext";
import "./App.css";
import Routes from "./Components/Routes";
import Sidebar from "./Components/Sidebar";

/**
 * App
 *
 * The main app component. Uses a ref to toggle the sidebar
 * open and closed. Holds the routes for the registration page,
 * and the admin page.
 */
function App() {
  const sidebarRef = useRef();

  const toggleSidebar = () => {
    sidebarRef.current.classList.toggle("sidebar-open");
  };

  return (
    <div className="App">
      <h1 id="yodlr-logo">Yodlr!</h1>
      <i
        id="burgerMenu"
        data-testid="burgerButton"
        className="fas fa-bars"
        onClick={toggleSidebar}
      ></i>
      <div
        className="sidebar-parent"
        data-testid="sidebarParent"
        ref={sidebarRef}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <UserProvider>
        <Routes />
      </UserProvider>
    </div>
  );
}

export default App;
