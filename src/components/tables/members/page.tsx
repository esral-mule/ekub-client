
import { DataTable } from "./data-table"
import { getColumns  } from "./columns"
import { useTranslation } from "react-i18next";


export default function DemoPage({ data,isLoading ,setData,setNewMembership,setActiveRound}) {

    const { t } = useTranslation("global");   
    const columns = getColumns(setData,t);

    return (
        <div className="container py-10">
            {isLoading ?

                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {t("tabs.members.loading")}
                </h2> :
                <DataTable columns={columns} data={data} setData={setData} setNewMembership={setNewMembership} setActiveRound={setActiveRound}/>
                }
        </div>
    )
}
