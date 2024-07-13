import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ModeToggle } from "../components/mode-toggle";
import { Toaster } from "../components/ui/toaster";

const Layout = () => {
  const { state } = useContext(AuthContext);

  return (
    <>
      {state.isAuthenticated && (
        <nav className="bg-slate-200 dark:bg-gray-800 p-3 mb-3">
          <ul className="flex space-x-2 justify-between">
            <div>
              <li>
                <NavLink to="/" className="px-2 hover:text-gray-400">
                  Ekub
                </NavLink>
                <NavLink
                  to="/createuser"
                  className="px-2 hover:text-gray-400"
                >
                  Create User
                </NavLink>
              </li>
            </div>
            <li className="flex items-center gap-3">
              <NavLink to="/signout" className="px-2">
                <p>logout</p>
              </NavLink>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      )}

      <Outlet />
      <Toaster />
    </>
  );
};

export default Layout;
