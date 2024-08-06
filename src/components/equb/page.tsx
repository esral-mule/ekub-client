import { columns } from "./columns"
import { DataTable } from "./data-table"
import API from "../../api/axios";
import { useState, useEffect } from "react";


export default function DemoPage({ id }) {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {        
        API.get(`/membership/etype/${id}`, {
        })
            .then((data) => {
                setData(data.data.data);
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            })
    }, [])
    return (
        <div className="container py-10">
            {isLoading ?

                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Loading
                </h2> :
                <DataTable columns={columns} data={data} setData={setData} equbid=""/>}
        </div>
    )
}
