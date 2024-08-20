
import { DataTable } from "./data-table"
import { getColumns  } from "./columns"


export default function DemoPage({ data,isLoading ,setData,setNewMembership}) {


    
    const columns = getColumns(setData);

    return (
        <div className="container py-10">
            {isLoading ?

                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Loading
                </h2> :
                <DataTable columns={columns} data={data} setData={setData} setNewMembership={setNewMembership}/>
                }
        </div>
    )
}
