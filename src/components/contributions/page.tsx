import { columns } from "./columns";
import { DataTable } from "./data-table";
import API from "../../api/axios";
import { useState, useEffect } from "react";

export default function DemoPage({ RoundId, handleStartRound }) {
    const [contributions, setContributions] = useState([]);

    useEffect(() => {
        API.get(`/contribution/round/${RoundId}`)
            .then((data) => {
                setContributions(data.data.data);
            })
            .catch((err) => {
                console.error("Error fetching contributions:", err);
            });
    }, [RoundId]);

    return (
        <div className="container py-10">
            <DataTable columns={columns(setContributions)} data={contributions} handleStartRound={handleStartRound} />
        </div>
    );
}
