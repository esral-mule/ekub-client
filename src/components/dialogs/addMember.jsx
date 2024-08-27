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
import { Label } from "@/components/ui/label";
import SelectData from "../select/SelectData";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../api/axios";
import { PlusCircle } from "lucide-react";
import CreateUser from "./CreateUser";
import CreateEqubLevel from "./CreateEqubLevel";
import UniqueIdDetail from "../tables/UniqueIdDetail";
import { useTranslation } from "react-i18next";

export default function AddMember({ setData, setNewMembership,setActiveRound }) {
  let { id: equbId } = useParams();
  const { t, i18n } = useTranslation("global");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserValue, setSelectedUserValue] = useState("");
  const [selectedUserLabel, setSelectedUserLabel] = useState("");

  const [equbLevel, setEqubLevel] = useState("");
  const [equbLevels, setEqubLevels] = useState([]);
  const [selectedEqubLevelValue, setSelectedEqubLevelValue] = useState("");
  const [selectedEqubLevelLabel, setSelectedEqubLevelLabel] = useState("");

  const [uniqueId, setUniqueId] = useState("");
  const [uniqueIds, setUniqueIds] = useState([]);
  const [selectedUniqueIdValue, setSelectedUniqueIdValue] = useState("");
  const [selectedUniqueIdLabel, setSelectedUniqueIdLabel] = useState("");

  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await API.get("/member/");
        setUsers(
          userResponse.data.data.map(({ fullName, _id }) => ({
            label: fullName,
            value: _id,
          }))
        );

        const equbLevelResponse = await API.get(`/equb-level/etype/${equbId}`);
        setEqubLevels(
          equbLevelResponse.data.data.map(({ title, _id }) => ({
            label: title,
            value: _id,
          }))
        );

        const uniqueIdResponse = await API.get(`/uniqueid/etype/${equbId}`);
        setUniqueIds(
          uniqueIdResponse.data.data.map(({ uniqueId, _id }) => ({
            label: uniqueId.toString(),
            value: _id,
          }))
        );
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [equbId]);

  const handleSubmit = () => {
    API.post("/membership", {
      member: user,
      equbType: equbId,
      equbLevel: equbLevel,
      uniqueId: uniqueId,
    })
      .then((data) => {
        setOpenModal(false);
        setNewMembership(data.data.data._id);
        setSelectedUserValue("");
        setSelectedUserLabel("");
        setSelectedEqubLevelValue("");
        setSelectedEqubLevelLabel("");
        setSelectedUniqueIdValue("");
        setSelectedUniqueIdLabel("");
        return data.data.data;
      })
      .then(data=>{
        API.get(`/round/etype/${equbId}`).then(res=>{
          let round = res.data.data.find(round => round.closed == false);
          setActiveRound(round)
        })
        return data;
      })
      .then((data) => {
        API.get(`/membership/${data._id}`).then((resp) => {
          let membership = resp.data.data;
          setData((prev) => {
            return [...prev, membership];
          });
        });
      })
      .catch((err) => {
        console.log(err);
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
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("addMember.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("addMember.des")}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="user" className="text-right pr-2">
              {t("addMember.member")}
            </Label>
            <SelectData
              data={users}
              name={t("addMember.selectUser")}
              action={setUser}
              setSelectedValue={setSelectedUserValue}
              selectedValue={selectedUserValue}
              selectedLabel={selectedUserLabel}
              setSelectedLabel={setSelectedUserLabel}
            />
            <CreateUser
              setUser={setUser}
              setUsers={setUsers}
              setSelectedUserValue={setSelectedUserValue}
              setSelectedUserLabel={setSelectedUserLabel}
            />
          </div>
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="equbLevel" className="text-right pr-2">
              {t("addMember.equbLevel")}
            </Label>
            <SelectData
              id="equbLevel"
              data={equbLevels}
              name={t("addMember.selectEqubLevel")}
              action={setEqubLevel}
              setSelectedValue={setSelectedEqubLevelValue}
              selectedValue={selectedEqubLevelValue}
              selectedLabel={selectedEqubLevelLabel}
              setSelectedLabel={setSelectedEqubLevelLabel}
            />
            <CreateEqubLevel
              setEqubLevel={setEqubLevel}
              setEqubLevels={setEqubLevels}
              setSelectedEqubLevelValue={setSelectedEqubLevelValue}
              setSelectedEqubLevelLabel={setSelectedEqubLevelLabel}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uniqueId" className="text-right">
              {t("addMember.uniqueId")}
            </Label>
            <SelectData
              id="uniqueId"
              data={uniqueIds}
              name={t("addMember.SelectUniqueId")}
              action={setUniqueId}
              setSelectedValue={setSelectedUniqueIdValue}
              selectedValue={selectedUniqueIdValue}
              selectedLabel={selectedUniqueIdLabel}
              setSelectedLabel={setSelectedUniqueIdLabel}
            />
          </div>
          {selectedUniqueIdValue && (
            <div>
              <UniqueIdDetail uniqueID={selectedUniqueIdValue} />
            </div>
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
              disabled={
                selectedEqubLevelValue == "" ||
                selectedUniqueIdValue == "" ||
                selectedUserValue == ""
              }
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
