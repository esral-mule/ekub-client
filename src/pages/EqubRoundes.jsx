import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router";
import DemoPage from "../components/contributions/page";
import SelectRound from "../components/SelectRound";

export default function EqubRounds() {
  const { id } = useParams();
  const [contributions, setContributions] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await API.get("/contribution");
        const data = response.data.data;
        const groupedByRound = {};
        const groupedByCycle = {};

        data.slice(0, -1).forEach(({ round, ...contribution }) => {
          // Skip contributions not matching the specified equbType ID
          if (round.equbType._id !== id) return;

          // group by round
          const roundKey = round._id;
          if (!groupedByRound[roundKey]) {
            groupedByRound[roundKey] = {
              round: round.round,
              cycle: round.cycle,
              contributions: []
            };
          }
          groupedByRound[roundKey].contributions.push(contribution);

          // group by cycle
          const cycleKey = `R-${round.round} C-${round.cycle}`;
          if (!groupedByCycle[cycleKey]) {
            groupedByCycle[cycleKey] = {
              id: roundKey,
              round: round.round,
              cycle: round.cycle,
              contributions: []
            };
          }
          groupedByCycle[cycleKey].contributions.push(contribution);
        });

        const groupedByRoundArray = Object.values(groupedByRound);
        const groupedByCycleArray = Object.values(groupedByCycle);
        setContributions(groupedByRoundArray);
        setOptions(groupedByCycleArray);


        if (groupedByCycleArray.length > 0) {
          setSelectedOption(groupedByCycleArray[0]);
        }
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
    };

    fetchContributions();
  }, [id]);

  return (
    <div>
      <h1>Equb Rounds</h1>
      {options && (
        <SelectRound
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )}
      {selectedOption && (
        <DemoPage contribution={selectedOption.contributions} />
      )}
    </div>
  );
}
