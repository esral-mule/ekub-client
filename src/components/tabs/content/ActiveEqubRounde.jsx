import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useParams } from "react-router";
import DemoPage from "../../tables/contributions/page";
import StartNewRound from "../../dialogs/StartNewRound";
import { useToast } from "../../ui/use-toast";
import CloseActiveRound from "../../dialogs/CloseActiveRound";
import { Loader2 } from "lucide-react";
export default function ActiveEqubRound() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleStartRound = () => {
    API.post("/round/start", {
      equbType: id,
    })
      .then((data) => {
        setSelectedOption(data.data.data);
        toast({
          title: "Start New Round",
          description: "Started New Round successfuly",
        });
      })
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
        const data = response.data.data.filter(
          (round) => round.closed === false
        )[0];
        setSelectedOption(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="self-end mr-2 mb-2">
        {!isLoading && 
          (selectedOption ? (
            <CloseActiveRound
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ) : (
            <StartNewRound handleStartRound={handleStartRound} />
          ))}
      </div>
      {isLoading && (
        <div className="my-5">
          <Loader2 className="mx-auto h-4 w-4 animate-spin" />
        </div>
      )}
      {selectedOption && (
        <DemoPage
          RoundId={selectedOption._id}
          handleStartRound={handleStartRound}
        />
      )}
    </div>
  );
}
