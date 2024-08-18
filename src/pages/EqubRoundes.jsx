import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router";
import DemoPage from "../components/contributions/page";
import SelectRound from "../components/SelectRound";

export default function EqubRounds() {
  const { id } = useParams();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await API.get(`/round/etype/${id}`);
        const data = response.data.data;
        setOptions(data);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
    };

    fetchContributions();
  }, [id]);

  return (
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
  );
}
