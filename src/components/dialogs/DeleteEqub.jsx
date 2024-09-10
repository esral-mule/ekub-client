import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import API from "../../api/axios";
import { useToast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function DeleteEqub({ equb, getEqubs }) {
  const { t } = useTranslation("global");
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    API.delete(`/equb-type/${equb._id}`)
      .then(() => {
        getEqubs();
        toast({
          title: "Delete Equb",
          description: "Deleted Equb successfuly",
        });
        setOpenModal(false);
      })
      .catch(() => {
        toast({
          title: "Delete Equb",
          variant: "destructive",
          description: "Deleted Equb successfuly",
        });
        setOpenModal(false);
      });
  };

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          variant="destructive"
          onClick={(event) => {
            event.stopPropagation();
            setOpenModal(true);
          }}
          className="ml-auto print:hidden mr-1 w-full"
        >
          <Trash2 size={18} className="pr-1" />
          {t("deleteEqub.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <p className="pl-1">{t("deleteEqub.title")}</p>
          </AlertDialogTitle>
          <AlertDialogDescription>{t("deleteEqub.des")}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end">
            <Button
              className="h-8 gap-1 bg-primary"
              onClick={(event) => {
                event.stopPropagation();
                setOpenModal(false);
              }}
              type="submit"
            >
              <span>{t("deleteEqub.cancel")}</span>
            </Button>
            <Button
              variant="destructive"
              className="h-8 gap-1"
              type="submit"
              onClick={(event) => {
                event.stopPropagation();
                handleDelete();
              }}
            >
              <span>{t("deleteEqub.confirm")}</span>
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
