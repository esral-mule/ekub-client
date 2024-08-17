import { columns } from "./columns"
import { DataTable } from "./data-table"
import API from "../../api/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";


export default function DemoPage({RoundId,handleStartRound}) {
    const [contributions, setContributions] = useState([]);

    useEffect(()=>{
        API.get(`/contribution/round/${RoundId}`)
        .then((data)=>{                     
            setContributions(data.data.data)
        })
        .catch()
    },[RoundId])
    return (
        <div className="container py-10">
            <DataTable columns={columns} data={contributions} handleStartRound={handleStartRound}/>
        </div>
    )
}
