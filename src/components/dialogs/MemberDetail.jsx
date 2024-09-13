import { User } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MemberDetail({ user }) {
  const { t } = useTranslation("global");

  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          className="bg-primary ml-auto print:hidden mb-[1px] w-full"
        >
          <User size={18} className="pr-1" />
          {t("memberDetail.detail")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%]  sm:max-w-lg max-h-[80vh] overflow-y-auto p-6 rounded-md shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {t("memberDetail.title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            {t("memberDetail.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 max-h-52 overflow-y-scroll">
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold"> {t("memberDetail.fullName")}</p>
            <p className="text-md">{user.member.fullName}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold ">
              {" "}
              {t("memberDetail.phoneNumber")}
            </p>
            <p className="text-md ">{user.member.phoneNumber}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold "> {t("memberDetail.username")}</p>
            <p className="text-md ">{user.member.username}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold "> {t("memberDetail.equbType")}</p>
            <p className="text-md ">{user.equbType.name}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold "> {t("memberDetail.equbLevel")}</p>
            <p className="text-md ">{user.equbLevel.title}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold "> {t("memberDetail.uniqueId")}</p>
            <p className="text-md ">{user.uniqueId.uniqueId}</p>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold">Active Status:</p>
            <p
              className={`text-md ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <AlertDialogFooter className="mb-4">
          <Button size="xs" onClick={() => setOpen(false)}>
            {t("memberDetail.close")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
