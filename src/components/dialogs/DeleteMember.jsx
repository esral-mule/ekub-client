import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import API from "../../api/axios";
import { useToast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";


export default function DeleteMember({ user, getMembers }) {
  const { t } = useTranslation("global");

  const { toast } = useToast();
  const [openModal, setOpenModal] = useState(false);

  const handleBan = () => {
    API.delete(`/membership/${user._id}/`)
      .then(() => {
        getMembers()
        toast({
          title: "Member Delete",
          description: "Member deleted successfuly",
        });
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Member Delete",
          description: "Member Delete failed",
        });
      });
  };
  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          variant="destructive"
          onClick={() => {
            setOpenModal(true);
          }}
          className="ml-auto print:hidden mb-[1px] mr-1 w-full"
        >
          <Trash2 size={18} className="pr-1" />
          {t("memberDelete.delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <p className="pl-1">{t("memberDelete.title")} </p>
          </AlertDialogTitle>
          <AlertDialogDescription>
          {t("memberDelete.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end">
          <Button
            size="sm"
            className="h-8 gap-1 bg-primary"
            onClick={() => {
              setOpenModal(false);
            }}
            type="submit"
          >
            <span>{t("memberDelete.close")}</span>
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-8 gap-1"
            onClick={handleBan}
            type="submit"
          >
            <Trash2 size={18} className="pr-1" />

            <span>{t("memberDelete.confirm")}</span>
          </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
