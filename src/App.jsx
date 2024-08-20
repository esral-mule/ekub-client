import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/Home";
import Layout from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./pages/Signin";
import Logout from "./pages/Logout";
import { AnimatePresence } from "framer-motion";
import CreateUser from "./pages/CreateUser";
import ListEqubes from "./pages/ListEqubes";
import EqubDetail from "./pages/EqubDetail";
import UserDetail from "./pages/UserDetail";
import CreateEqub from "./pages/CreateEqub";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <AnimatePresence mode="wait">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                                    <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signout" element={<Logout />} />
                  <Route path="/createuser" element={<CreateUser />} />
                  <Route path="/equbes" element={<ListEqubes />} />
                  <Route path="/createeqube" element={<CreateEqub />} />
                  <Route path="/equbdetail/:id" element={<EqubDetail />} />
                  <Route path="/userdetail/:id" element={<UserDetail />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
