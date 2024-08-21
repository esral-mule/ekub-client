import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../ui/alert-dialog";
import { Button } from "../ui/button";

export default function UpdatePaymentStatus({handleStartRound}) {
  
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button  size="xs" className="ml-auto print:hidden bg-primary">
        Start New Round
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You are about to start new round. please make sure if you have
          closed other opend rounds.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleStartRound}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}
