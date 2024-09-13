import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import API from "../../api/axios";
import { useToast } from "../ui/use-toast";
import { UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function CreateUser({ setUser }) {
  const { toast } = useToast();
  const { t } = useTranslation("global");

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    API.post("/member", {
      fullName,
      phoneNumber,
      password,
    })
      .then((data) => {
        setFullName("");
        setPhoneNumber("");
        setPassword("");
        setErrors({});
        setIsLoading(false);
        setUser(data.data.data);

        setOpen(false);
        toast({
          description: "User created successfully",
        });
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
        toast({
          variant: "destructive",
          description: err.response?.data?.message || "User creation failed",
        });
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="xs" className="px-1 ml-2 text-[8px] text-wrap bg-primary">
          <UserPlus size={18} className="pr-1" />
          {t("creatNewUser.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {t("creatNewUser.title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {t("creatNewUser.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              {t("creatNewUser.fullName")}
            </Label>
            <div className="col-span-3">
              <span className="block mb-1">
                {errors.fullName && (
                  <div className="text-red-600 text-xs">{errors.fullName}</div>
                )}
              </span>
              <Input
                id="fullName"
                placeholder={t("creatNewUser.placeholders.fullName")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`${
                  errors.fullName ? "outline outline-red-700" : ""
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              {t("creatNewUser.phoneNumber")}
            </Label>
            <div className="col-span-3">
              <span className="block mb-1">
                {errors.phoneNumber && (
                  <div className="text-red-600 text-xs">
                    {errors.phoneNumber}
                  </div>
                )}
              </span>
              <Input
                id="phoneNumber"
                placeholder={t("creatNewUser.placeholders.phoneNumber")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`${
                  errors.phoneNumber ? "outline outline-red-700" : ""
                }`}
              />
            </div>
          </div>

          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              {t("creatNewUser.username")}
            </Label>
            <Input
              id="username"
              placeholder={t("creatNewUser.placeholders.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`col-span-3 ${
                errors.username ? "outline outline-red-700" : ""
              }`}
            />
          </div> */}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              {t("creatNewUser.password")}
            </Label>
            <div className="col-span-3">
              <span className="block mb-1">
                {errors.password && (
                  <div className="text-red-600 text-xs">{errors.password}</div>
                )}
              </span>
              <Input
                id="password"
                placeholder={t("creatNewUser.placeholders.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  errors.password ? "outline outline-red-700" : ""
                }`}
              />
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end">
            <Button
              size="xs"
              disabled={isLoading}
              onClick={() => setOpen(false)}
            >
              {t("addMember.close")}
            </Button>
            <Button
              size="xs"
              onClick={handleSubmit}
              type="submit"
              disabled={
                isLoading ||
                fullName === "" ||
                phoneNumber === "" ||
                password === ""
              }
            >
              <UserPlus size={18} className="pr-1" />

              {isLoading
                ? t("creatNewUser.loading")
                : t("creatNewUser.confirm")}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
