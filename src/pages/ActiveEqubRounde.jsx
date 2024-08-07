import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router";
import DemoPage from "../components/contributions/page";

export default function ActiveEqubRound() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await API.get(`/round/etype/${id}`);
        const data = response.data.data;
        setSelectedOption(data[0])
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching contributions:", error);
        setIsLoading(false)
      }
    };

    fetchContributions();
  }, [id]);

  return (
    <div>
      {
        isLoading && <div>Loading</div>
      }
      {selectedOption && (
        <DemoPage RoundId={selectedOption._id} />
      )}
    </div>
  );
}
