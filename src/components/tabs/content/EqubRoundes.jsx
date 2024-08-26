import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useParams } from "react-router";
import DemoPage from "../../tables/contributions/page";
import SelectRound from "../../select/SelectRound";
import { Loader2 } from "lucide-react";

export default function EqubRounds() {
  const { id } = useParams();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setIsLoading(true);
        const response = await API.get(`/round/etype/${id}`);
        const data = response.data.data;
        setOptions(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching contributions:", error);
      }
    };

    fetchContributions();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Loader2 className="mx-auto h-4 w-4 animate-spin" />
      ) : (
        <div>
          {options.length > 0 && (
            <SelectRound
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}

          {selectedOption && <DemoPage RoundId={selectedOption._id} />}
        </div>
      )}
    </div>
  );
}
