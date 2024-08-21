import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useState } from "react";
import API from "../../api/axios";
import { useToast } from "../ui/use-toast";

export default function DeleteMember({ user, setData }) {
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
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          size="xs"
          onClick={() => {
            setOpenModal(true);
          }}
          className="bg-destructive ml-auto print:hidden mb-[1px] mr-1 w-full"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <p className="pl-1">Delete Member</p>
          </DialogTitle>
          <DialogDescription>
            Please make sure you want to delete{" "}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            size="sm"
            className="h-8 gap-1 bg-primary"
            onClick={() => {
              setOpenModal(false);
            }}
            type="submit"
          >
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1 bg-destructive"
            onClick={handleBan}
            type="submit"
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
