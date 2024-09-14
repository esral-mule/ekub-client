import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Label } from "@/components/ui/label";
import SelectEqubLevel from "../select/SelectEqubLevel";
import SelectUser from "../select/SelectUser";
import SelectUniqueId from "../select/SelectUniqueId";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../api/axios";
import { PlusCircle } from "lucide-react";
import CreateUser from "./CreateUser";
import CreateEqubLevel from "./CreateEqubLevel";
import UniqueIdDetail from "../tables/UniqueIdDetail";
import { useTranslation } from "react-i18next";
import { useToast } from "../ui/use-toast";

export default function AddMember({
  getMembers,
  setNewMembership,
  getActiveRound,
}) {
  let { id: equbId } = useParams();
  const { t } = useTranslation("global");
  const [user, setUser] = useState("");

  const [equbLevel, setEqubLevel] = useState("");
  const [equbLevels, setEqubLevels] = useState([]);

  const [uniqueId, setUniqueId] = useState("");
  const [uniqueIds, setUniqueIds] = useState([]);
  const [isFull, setIsFull] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();

  const getEqubLevels = async () => {
    const equbLevelResponse = await API.get(`/equb-level/etype/${equbId}`);
    setEqubLevels(
      equbLevelResponse.data.data.map(({ title, _id, contribution }) => ({
        label: title,
        value: _id,
        contribution,
      }))
    );
  };
  const getUniqeIds = async () => {
    const uniqueIdResponse = await API.get(`/uniqueid/notfull/etype/${equbId}`);
    setUniqueIds(
      uniqueIdResponse.data.data.map(({ uniqueId, _id }) => ({
        label: uniqueId.toString(),
        value: _id,
      }))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getEqubLevels();
        await getUniqeIds();
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [equbId]);

  const handleSubmit = () => {
    setOpenModal(false);
    API.post("/membership", {
      member: user._id,
      equbType: equbId,
      equbLevel: equbLevel.value,
      uniqueId: uniqueId.value,
      isFull,
    })
      .then((data) => {
        setNewMembership(data.data.data._id);
        setUser("");
        setEqubLevel("");
        setUniqueId("");
        return data.data.data;
      })
      .then(() => {
        getActiveRound();
      })
      .then(() => {
        toast({
          description: "Memeber added successfuly",
        });
        getMembers();
      })
      .catch((err) => {
        console.log(err);
        
        toast({
          variant: "destructive",
          description: "Memeber adding failed",
        });
      });
  };

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          size="xs"
          className="ml-auto print:hidden bg-primary mr-1"
        >
          <PlusCircle className="h-3.5 w-3.5 pr-1" />
          {t("addMember.name")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("addMember.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("addMember.des")}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="user" className="text-right pr-2">
              {t("addMember.member")}
            </Label>
            <SelectUser action={setUser} user={user} />
            <CreateUser setUser={setUser} />
          </div>
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="equbLevel" className="text-right pr-2">
              {t("addMember.equbLevel")}
            </Label>
            <SelectEqubLevel
              data={equbLevels}
              name={t("addMember.selectEqubLevel")}
              setEqubLevel={setEqubLevel}
              equbLevel={equbLevel}
            />
            <CreateEqubLevel
              setEqubLevel={setEqubLevel}
              getEqubLevels={getEqubLevels}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uniqueId" className="text-right">
              {t("addMember.uniqueId")}
            </Label>
            <SelectUniqueId
              data={uniqueIds}
              name={t("addMember.SelectUniqueId")}
              setUniqueId={setUniqueId}
              uniqueId={uniqueId}
            />
          </div>
          {uniqueId && (
            <div>
              <UniqueIdDetail
                uniqueID={uniqueId.value}
                equbLevel={equbLevel}
                setIsFull={setIsFull}
              />
            </div>
          )}

          {uniqueId && equbLevel && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("addMember.isFull")}</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <Checkbox
                      checked={isFull}
                      onCheckedChange={() => {
                        setIsFull(!isFull);
                      }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end">
            <Button size="xs" onClick={() => setOpenModal(false)}>
              {t("addMember.close")}
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1 max-w-40"
              onClick={handleSubmit}
              type="submit"
              disabled={!user || !equbLevel || !uniqueId}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="not-sr-only sm:whitespace-nowrap">
                {t("addMember.confirm")}
              </span>
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
