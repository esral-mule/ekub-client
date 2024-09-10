import { SquarePen } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

export default function updatePaymentStatus({
  UpdatePaymentStatus,
  isloading,
}) {
  const { t } = useTranslation("global");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="xs" className="ml-auto print:hidden bg-primary">
          <SquarePen size={18} className="pr-1" />
          {isloading?t("updatePayment.updating"): t("updatePayment.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("updatePayment.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("updatePayment.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end items-end">
            <AlertDialogCancel>{t("updatePayment.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={UpdatePaymentStatus}>
              {t("updatePayment.confirm")}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
