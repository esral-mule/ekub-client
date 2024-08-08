import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

import { Button } from "../components/ui/button";
import API from "../api/axios";
import { useNavigate } from "react-router";
import Transition from "../components/Transition";
import { useToast } from "../components/ui/use-toast";

const CreateUser = () => {
  let navigate = useNavigate();
  const { toast } = useToast()
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    API.post("/member", {
      fullName,
      username,
      phoneNumber,
      password,
    })
      .then(() => {
        setErrors({});
        toast({
          title: "User Create ",
          description: "User Created successfuly",
        })
        setIsLoading(false)
        navigate("/");
      })
      .catch((err) => {
        const responseErrors = err.response?.data?.errors || [];
        const global =
          err.response?.data?.code === 500 ? "Validation Error" : "";
        let tempErrors = {};
        responseErrors.forEach((error) => {
          tempErrors[error.field] = error.messages;
        });
        setErrors({ ...tempErrors, global });
        setIsLoading(false)
      });
  };

  return (
    <Transition>
      <form className="max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          {errors.global && (
            <div className="text-red-600 mb-[10px]">{errors.global}</div>
          )}
          <CardContent className="space-y-2">
            <div className="space-y-1 text-left">
              {errors.fullName && (
                <div className="text-red-600 mb-[10px]">{errors.fullName}</div>
              )}
              <Label htmlFor="fullName">Full-Name</Label>
              <Input
                id="fullName"
                placeholder="FullName ..."
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </div>

            <div className="space-y-1 text-left">
              {errors.username && (
                <div className="text-red-600 mb-[10px]">{errors.username}</div>
              )}
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username ..."
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="space-y-1 text-left">
              {errors.phoneNumber && (
                <div className="text-red-600 mb-[10px]">
                  {errors.phoneNumber}
                </div>
              )}
              <Label htmlFor="phonenumber">Phone-Number</Label>
              <Input
                id="phonenumber"
                placeholder="PhoneNumber ..."
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>

            <div className="space-y-1 text-left">
              {errors.password && (
                <div className="text-red-600 mb-[10px]">{errors.password}</div>
              )}
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
                  color={`${passwordVisible ? "#d2062a" : "#06d28c"}`}
                  type="solid"
                  onClick={togglePasswordVisibility}
                ></box-icon>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading}> {isLoading?"loading":"Create Equber"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Transition>
  );
};

export default CreateUser;