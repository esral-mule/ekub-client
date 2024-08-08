import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router";
import DemoPage from "../components/contributions/page";
import { Button } from "../components/ui/button";
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
} from "../components/ui/alert-dialog";
import { useToast } from "../components/ui/use-toast";
export default function ActiveEqubRound() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast()

  const handleStartRound = ()=>{
    API.post("/round/start",{
      equbType:id
    }).then(
      toast({
        title: "Start New Round",
        description: "Started New Round successfuly",
      })
    ).catch(
      toast({
        title: "Start New Round",
        description: "Starting New Round Failed",
      })
    )    
  }
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await API.get(`/round/etype/${id}`);
        const data = response.data.data;
        setSelectedOption(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contributions:", error);
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, [id]);

  return (
    <div className="flex flex-col">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="self-end" variant="outline">
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStartRound}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isLoading && <div>Loading</div>}
      {selectedOption && <DemoPage RoundId={selectedOption._id} />}
    </div>
  );
}
