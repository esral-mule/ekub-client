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
import { useParams } from "react-router";
import { CirclePlus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CreateEqubLevel({
  fromTab,
  setEqubLevels,
  setEqubLevel,
  setSelectedEqubLevelValue,
  setSelectedEqubLevelLabel,
}) {
  let { id } = useParams();
  const { t, i18n } = useTranslation("global");   

  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [contribution, setContribution] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    API.post("/equb-level", {
      equbType: id,
      title,
      contribution,
    })
      .then((data) => {
        setIsLoading(false);
        setEqubLevels((prev) => {
          return [
            ...prev,
            {
              label: data.data.data.title,
              value: data.data.data._id,
            },
          ];
        });

        if (!fromTab) {
          setEqubLevel(data.data.data._id);
          setSelectedEqubLevelLabel(data.data.data.title);
          setSelectedEqubLevelValue(data.data.data._id);
        }
        setOpen(false);
        toast({
          description: "Equb level Added Successfully",
        });
      })
      .then(() => {
        if (fromTab) {
          API.get(`/equb-level/etype/${id}`).then((data) => {
            console.log("data = ", data);
            setEqubLevels(data.data.data);
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          description:
            error.response?.data?.message || "Equb Level creation failed",
        });
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          className={`px-1 print:hidden ml-2 text-[8px] text-wrap bg-primary ${
            fromTab === true ? "px-2 text-[12px] self-end" : ""
          }`}
        >
          <CirclePlus size={fromTab ? 18 : 15} className="pr-1" />
          {t("addEqubLevel.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader className="mb-3">
          <AlertDialogTitle className="text-center">
          {t("addEqubLevel.title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
          {t("addEqubLevel.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4 mb-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
            {t("addEqubLevel.lable")}
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contribution" className="text-right">
            {t("addEqubLevel.contribution")}
            </Label>
            <Input
              id="contribution"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <AlertDialogFooter className="mb-4">
          <Button size="xs" variant="secondary" onClick={() => setOpen(false)}>
          {t("addEqubLevel.cancel")}
          </Button>
          <Button
            size="xs"
            onClick={handleSubmit}
            type="submit"
            disabled={isLoading || title=="" || contribution==""}
          >
            <CirclePlus size={fromTab ? 18 : 15} className="pr-1 pt-[1px]" />

            {isLoading ? t("addEqubLevel.loading") : t("addEqubLevel.confirm")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
