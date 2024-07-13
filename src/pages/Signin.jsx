import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "boxicons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useContext } from "react";

import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../components/ui/use-toast";

export default function Signin() {
  const { toast } = useToast()
  let navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    API.post("/users/login", {
      phoneNumber,
      password,
    })
      .then((res) => {
        const { accessToken, refreshToken } = res.data.data.tokens;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        login(res.data.user);
        setError("");
        toast({
          description: "Logged in Successfuly",
        })
        setIsLoading(false)
        navigate("/");
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
        setIsLoading(false)
      });
  };
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Signin</CardTitle>
          {error && <div className="text-red-600 mb-[10px]">{error}</div>}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1 text-left">
            <Label htmlFor="phoneNumber">PhoneNumber</Label>
            <Input
              id="phoneNumber"
              placeholder="PhoneNumber ..."
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>

          <div className="space-y-1 text-left">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center">
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Your password ..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <box-icon
              size="md"
                name={`toggle-${passwordVisible ? "right" : "left"}`}
                color="#854460"
                type="solid"
                onClick={togglePasswordVisibility}
              ></box-icon>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading}> {isLoading?"loading":"Login"}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
