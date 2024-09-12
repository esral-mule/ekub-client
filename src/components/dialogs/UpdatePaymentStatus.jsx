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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
export default function updatePaymentStatus({
  contribution,
  UpdatePaymentStatus,
  isloading,
}) {
  const [punishment, setPunishment] = useState("");

  useEffect(() => {
    setPunishment(contribution.punishment === 0 ? "" : contribution.punishment);
  }, [contribution]);
  const { t } = useTranslation("global");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="xs" className="ml-auto print:hidden bg-primary">
          <SquarePen size={18} className="pr-1" />
          {isloading ? t("updatePayment.updating") : t("updatePayment.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("updatePayment.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("updatePayment.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("updatePayment.punishment")}</AccordionTrigger>
            <AccordionContent>
              <div>
                <Input
                  id="punishment"
                  placeholder={t("updatePayment.placeholder")}
                  value={punishment}
                  onChange={(e) => setPunishment(e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end items-end">
            <AlertDialogCancel>{t("updatePayment.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                UpdatePaymentStatus(punishment);
              }}
            >
              {t("updatePayment.confirm")}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
