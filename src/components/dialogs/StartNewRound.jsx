import { useTranslation } from "react-i18next";
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

export default function UpdatePaymentStatus({ handleStartRound }) {
  const { t, i18n } = useTranslation("global");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="xs" className="ml-auto print:hidden bg-primary">
          {t("startRound.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("startRound.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("startRound.des")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end">
            <AlertDialogCancel size="sm">
              {t("startRound.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleStartRound}>
              {t("startRound.confirm")}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
