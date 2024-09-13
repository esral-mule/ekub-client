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
import { useTranslation } from "react-i18next";
import ClosedEye from "../components/icons/ClosedEye";
import OpenedEye from "../components/icons/OpenedEye";

const CreateUser = () => {
  let navigate = useNavigate();
  const { toast } = useToast()
  const { t } = useTranslation("global");
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
        const responseErrors = err.response?.data.errors || [];
        const global = err.response?.data?.message;
        let tempErrors = {};       
        responseErrors.forEach((errorObj) => {
          let errorMessage = errorObj.messages;
      
          tempErrors[errorObj.field] = errorMessage;
        });
        setErrors({ ...tempErrors, global });
        setIsLoading(false);
      });
  };

  return (
    <Transition>
      <form className="max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{t("creatUser.title")}</CardTitle>
          </CardHeader>
          {errors.global && (
            <div className="text-red-600 mb-[10px]">{errors.global}</div>
          )}
          <CardContent className="space-y-2">
            <div className="space-y-1 text-left">
              <Label htmlFor="fullName">{t("creatUser.fullName")}</Label>
              {errors.fullName && (
                <div className="text-red-600 text-xs">{errors.fullName}</div>
              )}
              <Input
                id="fullName"
                placeholder={t("creatUser.placeHolder.fullName")}
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </div>

            <div className="space-y-1 text-left">
              <Label htmlFor="username">{t("creatUser.username")}</Label>
              {errors.username && (
                <div className="text-red-600 text-xs">{errors.username}</div>
              )}
              <Input
                id="username"
                placeholder={t("creatUser.placeHolder.username")}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="space-y-1 text-left">
              <Label htmlFor="phonenumber">{t("creatUser.phoneNumber")}</Label>
              {errors.phoneNumber && (
                <div className="text-red-600 text-xs">
                  {errors.phoneNumber}
                </div>
              )}
              <Input
                id="phonenumber"
                placeholder={t("creatUser.placeHolder.phoneNumber")}
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>

            <div className="space-y-1 text-left">
              <Label htmlFor="password">{t("creatUser.password")}</Label>
              {errors.password && (
                <div className="text-red-600 text-xs">{errors.password}</div>
              )}
              <div className="flex items-center relative">
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Your password ..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div
                className="absolute top-3 right-2"
                onClick={() => {
                  togglePasswordVisibility();
                }}
              >
                {passwordVisible ? <ClosedEye/> : <OpenedEye/>}
              </div>
            </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading || fullName==""|| username == ""||phoneNumber=="" || password==""}> {isLoading? t("creatUser.loading"):t("creatUser.createEquber")}</Button>
          </CardFooter>
        </Card>
      </form>
    </Transition>
  );
};

export default CreateUser;