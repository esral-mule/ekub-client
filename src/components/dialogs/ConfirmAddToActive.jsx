/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import API from "../../api/axios";
import { useToast } from "../ui/use-toast";
import { useParams } from "react-router";

export default function ConfirmAddToActive({
  newMembership,
  setNewMembership,
}) {
  const { toast } = useToast();
  const { id } = useParams();
  const handleSubmit = (addToAcive) => {
    if (addToAcive) {
      API.post(`/round/add-to-round/${id}`, {
        member: newMembership,
      })
        .then(() => {
          toast({
            description: "user added to active round",
          });
        })
        .catch(() => {
          toast({
            variant: "destructive",
            description: "user added to active round failed",
          });
        });
    }
    setNewMembership(false);
  };

  return (
    <AlertDialog open={newMembership}>
      <AlertDialogContent className="max-w-[95%] max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>
            you want to add this user to the active round?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Confirm if you want this user to be added to the ongoing active
            round as a contributer
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end">
            <AlertDialogAction
              onClick={() => {
                handleSubmit(false);
              }}
            >
              Cancel
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                handleSubmit(true);
              }}
            >
              Add
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
