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
import { useToast } from "../ui/use-toast";
import API from "../../api/axios";
import { useParams } from "react-router";
import { useState } from "react";

export default function StartNewRound({ setSelectedOption }) {
  const { id } = useParams();
  const { toast } = useToast();
  const { t } = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const handleStartRound = () => {
    setIsLoading(true);
    API.post("/round/start", {
      equbType: id,
    })
      .then((data) => {
        setSelectedOption(data.data.data);
        toast({
          title: "Start New Round",
          description: "Started New Round successfuly",
        });
        setIsLoading(false);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Start New Round",
          description: "Starting New Round Failed",
        });
        setIsLoading(false);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isLoading}
          size="xs"
          className="ml-auto print:hidden bg-primary"
        >
          {t("startRound.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("startRound.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("startRound.des")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end items-end">
            <AlertDialogCancel>{t("startRound.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleStartRound}>
              {t("startRound.confirm")}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
