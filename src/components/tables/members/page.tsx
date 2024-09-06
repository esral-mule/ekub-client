import * as React from "react"
import { DataTable } from "./data-table"
import { getColumns  } from "./columns"
import { useTranslation } from "react-i18next";


export default function Page({ members,isLoading ,getMembers,setNewMembership,getActiveRound}) {

    const { t } = useTranslation("global");   
    const columns = getColumns(getMembers,t);

    return (
        <div className="container py-10">
            {isLoading ?

                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {t("tabs.members.loading")}
                </h2> :
                <DataTable columns={columns} data={members} getMembers={getMembers} setNewMembership={setNewMembership} getActiveRound={getActiveRound}/>
                }
        </div>
    )
}
