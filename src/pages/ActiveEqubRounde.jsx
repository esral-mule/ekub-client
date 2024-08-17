import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router";
import DemoPage from "../components/contributions/page";
import StartNewRound from "../components/dialogs/StartNewRound";
import { useToast } from "../components/ui/use-toast";
export default function ActiveEqubRound() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleStartRound = () => {
    API.post("/round/start", {
      equbType: id,
    })
      .then((data)=>{        
        setSelectedOption(data.data.data)
        toast({
          title: "Start New Round",
          description: "Started New Round successfuly",
        })
        }   )
      .catch(
        toast({
          title: "Start New Round",
          description: "Starting New Round Failed",
        })
      );
  };
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await API.get(`/round/etype/${id}`);
        const data = response.data.data;
        setSelectedOption(data[data.length - 1]);
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
      <StartNewRound handleStartRound={handleStartRound} />
      {isLoading && <div>Loading</div>}
      {selectedOption && (
        <DemoPage
          RoundId={selectedOption._id}
          handleStartRound={handleStartRound}
        />
      )}
    </div>
  );
}
