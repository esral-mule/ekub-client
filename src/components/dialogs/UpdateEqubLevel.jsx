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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import API from "../../api/axios";
import { useToast } from "../ui/use-toast";
import { CirclePlus, Pen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function UpdateEqubLevel({
  equbLevel,
  getEqubLevels,
}) {
  const { t } = useTranslation("global");

  const { toast } = useToast();

  const [title, setTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    
    API.put(`/equb-level/${equbLevel._id}`, {
      title,
    })
      .then(() => {
        setIsLoading(false);
        setOpen(false);

        setTitle("")

        getEqubLevels()

        toast({
          description: "Equb level updated Successfully",
        });
        getEqubLevels();
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description:
            error.response?.data?.message || "Equb Level update failed",
        });
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          className={`px-1 print:hidden text-wrap bg-primary w-full`}
        >
          <Pen size={18}/>
          <p className="px-1">{t("updateEqubLevel.name")}</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] sm:max-w-lg">
        <AlertDialogHeader className="mb-3">
          <AlertDialogTitle className="text-center">
            {t("updateEqubLevel.title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {t("updateEqubLevel.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4 mb-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              {t("updateEqubLevel.title-label")}
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <AlertDialogFooter className="mb-4">
          <div className="flex gap-x-1 justify-end">
            <Button size="xs" onClick={() => setOpen(false)}>
              {t("updateEqubLevel.cancel")}
            </Button>
            <Button
              size="xs"
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading || title == ""}
            >
              <CirclePlus size={18} className="pr-1 pt-[1px]" />

              {isLoading
                ? t("updateEqubLevel.loading")
                : t("updateEqubLevel.confirm")}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
