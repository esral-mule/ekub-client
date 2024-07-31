import { columns } from "./columns"
import { DataTable } from "./data-table"
import API from "../../api/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";


export default function DemoPage({contribution}) {
    
    // let { id } = useParams();
    // const [data, setData] = useState([])
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {

    //     API.get("/membership/", {
    //     })
    //         .then((data) => {
    //             setData(data.data.data.filter(i => i.equbType._id === id));
    //             setIsLoading(false);
    //         }).catch(err => {
    //             setIsLoading(false);
    //         })
    // }, [])
    return (
        <div className="container py-10">
            <DataTable columns={columns} data={contribution}/>
        </div>
    )
}
