/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

import API from "../api/axios";
import { useToast } from "../components/ui/use-toast";

export default function ConfirmAddToActive({
  newMembership,
  setNewMembership,
}) {
  const { toast } = useToast();

  const handleSubmit = (addToAcive) => {
    if (addToAcive) {
      API.post("/add-to-round", {
        member: newMembership
      })
        .then((res) => {
          console.log("res", res);

          toast({
            description: "user added to active round",
          });
        })
        .catch((err) => {
          console.log("err", err);

          toast({
            description: "user added to active round failed",
          });
        });
    }
    setNewMembership(false);
  };

  return (
    <AlertDialog open={newMembership}>
      <AlertDialogContent>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
