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
export default function AddMember() {
  let { id: equbId } = useParams();

  const [users, setUsers] = useState([]);
  const [equbLevels, setEqubLevels] = useState([]);
  const [uniqueIds, setUniqueIds] = useState([]);

  const [user, setUser] = useState("");
  const [equbLevel, setEqubLevel] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  useEffect(() => {
    API.get("/member/").then((data) => {
      setUsers(
        data.data.data.map(({ fullName, _id }) => ({
          label: fullName,
          value: _id,
        }))
      );
    });

    API.get("/equb-level/").then((data) => {
      setEqubLevels(
        data.data.data
          .filter((i) => i.equbType._id === equbId)
          .map(({ title, _id }) => ({ label: title, value: _id }))
      );
    });

    API.get("/uniqueid/").then((data) => {
      setUniqueIds(
        data.data.data
          .filter((i) => i.equbType._id === equbId)
          .map(({ uniqueId, _id }) => ({
            label: uniqueId.toString(),
            value: _id,
          }))
      );
    });
  }, []);

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
        <Button variant="outline">Add Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Fill all the required fields to add a member to equb
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Member
            </Label>
            <SelectData data={users} name="User" action={setUser} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Equb level
            </Label>
            <SelectData
              data={equbLevels}
              name="equb level"
              action={setEqubLevel}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Unique Id
            </Label>
            <SelectData
              data={uniqueIds}
              name="unique id"
              action={setUniqueId}
            />
          </div>

          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Equb level
            </Label>
            <SelectUser />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
            Unique Id
            </Label>
            <SelectUser />
          </div> */}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Add Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
