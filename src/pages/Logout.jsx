import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../components/ui/button";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Transition from "../components/Transition";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <Transition>
      <Card className="max-w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Logout</CardTitle>
          <CardDescription>Are you sure you want to logout?</CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleLogout}>
            Yes, Logout
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </CardFooter>
      </Card>
    </Transition>
  );
};

export default Logout;
