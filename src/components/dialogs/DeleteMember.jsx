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


export default function DeleteMember({ user, setData }) {
  const { t, i18n } = useTranslation("global");

  const { toast } = useToast();
  const [openModal, setOpenModal] = useState(false);

  const handleBan = () => {
    API.delete(`/membership/${user._id}/`)
      .then((data) => {
        setData((prevData) =>
          prevData.filter((member) => {
            return member._id !== user._id;
          })
        );
        toast({
          title: "Member Delete",
          description: "Member deleted successfuly",
        });
      })
      .catch((e) => {
        toast({
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
          onClick={() => {
            setOpenModal(true);
          }}
          className="bg-destructive ml-auto print:hidden mb-[1px] mr-1 w-full"
        >
          <Trash2 size={18} className="pr-1" />
          {t("memberDelete.delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <p className="pl-1">{t("memberDelete.title")} </p>
          </AlertDialogTitle>
          <AlertDialogDescription>
          {t("memberDelete.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
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
            className="h-8 gap-1 bg-destructive"
            onClick={handleBan}
            type="submit"
          >
            <Trash2 size={18} className="pr-1" />

            <span>{t("memberDelete.confirm")}</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
