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
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

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
                  <Route
                    path="/createuser"
                    element={
                      <ProtectedRoute>
                        <CreateUser />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/equbes"
                    element={
                      <ProtectedRoute>
                        <ListEqubes />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/createeqube"
                    element={
                      <ProtectedRoute>
                        <CreateEqub />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/equbdetail/:id"
                    element={
                      <ProtectedRoute>
                        <EqubDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/userdetail/:id"
                    element={
                      <ProtectedRoute>
                        <UserDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/support"
                    element={
                      <ProtectedRoute>
                        <Support />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
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
