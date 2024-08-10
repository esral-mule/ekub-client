import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import SelectData from "./SelectData";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../api/axios";
import { PlusCircle } from "lucide-react";

export default function AddMember() {
  let { id: equbId } = useParams();

  const [users, setUsers] = useState([]);
  const [equbLevels, setEqubLevels] = useState([]);
  const [uniqueIds, setUniqueIds] = useState([]);

  const [user, setUser] = useState("");
  const [equbLevel, setEqubLevel] = useState("");
  const [uniqueId, setUniqueId] = useState("");

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
    API.post("membership", {
      member: user,
      equbType: equbId,
      equbLevel: equbLevel,
      uniqueId: uniqueId,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-end" variant="outline">
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Fill all the required fields to add a member to equb
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user" className="text-right">
              Member
            </Label>
            <SelectData id="user" data={users} name="User" action={setUser} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="equbLevel" className="text-right">
              Equb level
            </Label>
            <SelectData
              id="equbLevel"
              data={equbLevels}
              name="Equb Level"
              action={setEqubLevel}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uniqueId" className="text-right">
              Unique Id
            </Label>
            <SelectData
              id="uniqueId"
              data={uniqueIds}
              name="Unique Id"
              action={setUniqueId}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={handleSubmit}
            type="submit"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Member
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
