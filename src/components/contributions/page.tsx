import { columns } from "./columns"
import { DataTable } from "./data-table"
import API from "../../api/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";


export default function DemoPage({contribution}) {
    
    return (
        <div className="container py-10">
            <DataTable columns={columns} data={contribution}/>
        </div>
    )
}
