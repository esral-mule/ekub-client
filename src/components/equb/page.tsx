import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import API from "../../api/axios";
import { useState, useEffect } from "react";


export default function DemoPage() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        API.get("/membership/", {
        })
            .then((data) => {
                setData(data.data.data.filter(i=>i.equbType = "669f77af1c724fd6ede1f9c0"));
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
                <DataTable columns={columns} data={data} setData={setData}/>}
        </div>
    )
}
