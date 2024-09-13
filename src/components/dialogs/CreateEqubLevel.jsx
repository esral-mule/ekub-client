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

export default function CreateEqubLevel({ fromTab, getEqubLevels }) {
  let { id } = useParams();
  const { t } = useTranslation("global");

  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [contribution, setContribution] = useState("");
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    API.post("/equb-level", {
      equbType: id,
      title,
      contribution,
    })
      .then(() => {
        setIsLoading(false);
        setOpen(false);
        setErrors({});
        setTitle("");
        setContribution("");
        if (!fromTab) {
          getEqubLevels();
        }
        toast({
          description: "Equb level Added Successfully",
        });
        getEqubLevels();
      })
      .catch((err) => {
        const responseErrors = err.response?.data.errors || [];
        const global = err.response?.data?.message;
        let tempErrors = {};
        responseErrors.forEach((errorObj) => {
          let errorMessage = errorObj.messages;

          tempErrors[errorObj.field] = errorMessage;
        });
        setErrors({ ...tempErrors, global });
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: err.response?.data?.message || "User creation failed",
        });

        setIsLoading(false);
        toast({
          variant: "destructive",
          description:
            err.response?.data?.message || "Equb Level creation failed",
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
          <CirclePlus size={18} className="pr-1" />
          {t("addEqubLevel.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] max-h-[80vh] overflow-y-auto sm:max-w-lg">
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

            <div className="col-span-3">
              <span className="block mb-1">
                {errors.title && (
                  <div className="text-red-600 text-xs">{errors.title}</div>
                )}
              </span>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`${
                  errors.fullName ? "outline outline-red-700" : ""
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contribution" className="text-right">
              {t("addEqubLevel.contribution")}
            </Label>

            <div className="col-span-3">
              <span className="block mb-1">
                {errors.contribution && (
                  <div className="text-red-600 text-xs">{errors.contribution}</div>
                )}
              </span>
              <Input
                id="contribution"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                className={`${
                  errors.fullName ? "outline outline-red-700" : ""
                }`}
              />
            </div>
          </div>
        </div>
        <AlertDialogFooter className="mb-4">
          <div className="flex gap-x-1 justify-end">
            <Button size="xs" onClick={() => setOpen(false)}>
              {t("addEqubLevel.cancel")}
            </Button>
            <Button
              size="xs"
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading || title == "" || contribution == ""}
            >
              <CirclePlus size={fromTab ? 18 : 15} className="pr-1 pt-[1px]" />

              {isLoading
                ? t("addEqubLevel.loading")
                : t("addEqubLevel.confirm")}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
