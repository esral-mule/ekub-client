import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router";
import DemoPage from "../components/contributions/page";

export default function EqubRounds() {
  const { id } = useParams();
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await API.get("/contribution");
        const data = response.data.data;
        const filteredContributions = data
          .slice(0, -1)
          .filter((contribution) => contribution.round.equbType._id === id);
        const groupedContributions = Object.groupBy(filteredContributions, ({ round }) => round._id);
        setContributions(groupedContributions);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
    };

    fetchContributions();
  }, [id]);

  return (
    <div>
      <h1>Equb Rounds</h1>
      {contributions && Object.entries(contributions).map(([roundId, contribution]) => (
        <DemoPage key={roundId} contribution={contribution} />
      ))}
    </div>
  );
}
