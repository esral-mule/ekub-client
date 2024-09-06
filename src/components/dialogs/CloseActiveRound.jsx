import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../api/axios";
import { Notebook } from "lucide-react";
import UniqueIdDetail from "../tables/UniqueIdDetail";
import Winner from "../icons/winner";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { useTranslation } from "react-i18next";
import { useToast } from "../ui/use-toast";
import SelectUniqueId from "../select/SelectUniqueId";

export default function CloseActiveRound({
  selectedOption,
  setSelectedOption,
}) {
  const { id: equbId } = useParams();
  const { t } = useTranslation("global");

  const [openModal, setOpenModal] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [uniqueIds, setUniqueIds] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueIdResponse = await API.get(`/uniqueid/etype/${equbId}`);
        setUniqueIds(
          uniqueIdResponse.data.data.map(({ uniqueId, _id }) => ({
            label: uniqueId.toString(),
            value: _id,
          }))
        );
      } catch (error) {
        console.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    setIsLoading(true)
    API.post("/beneficiary", {
      uniqueId: uniqueId.value,
    })
      .then((data) => {
        setIsLoading(false)
        setOpenModal(false);

        return data.data.data;
      })
      .then(() => {
        API.put(`/round/${selectedOption._id}`, { closed: true }).then(
          () => {}
        );
      })
      .then(() => {
        setSelectedOption(null);
        toast({
          description: "Round closed successfuly",
        });
      })
      .catch(() => {
        setIsLoading(false)
        toast({
          description: "Round close failed",
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
          className="mr-1 print:hidden bg-primary"
        >
          <Notebook size={18} className="pr-1" />
          {t("closeActiveRound.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <Winner /> <p className="pl-1">{t("closeActiveRound.title")}</p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("closeActiveRound.des")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uniqueId" className="text-right">
              {t("closeActiveRound.uniqueId")}
            </Label>
            <SelectUniqueId
              data={uniqueIds}
              name={t("closeActiveRound.searchPlaceHolder")}
              setUniqueId={setUniqueId}
              uniqueId={uniqueId}
            />
          </div>
          {uniqueId && (
            <div>
              <UniqueIdDetail uniqueID={uniqueId.value} />
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end">
            <Button disabled={isLoading} onClick={() => setOpenModal(false)} className="h-8 gap-1">
              {t("closeActiveRound.cancel")}
            </Button>
            <Button
              className="h-8 gap-1"
              variant="destructive"
              onClick={handleSubmit}
              type="submit"
              disabled={!uniqueId|| isLoading}
            >
              <span>{t("closeActiveRound.confirm")}</span>
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
