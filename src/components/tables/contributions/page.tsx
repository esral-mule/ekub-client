import { columns } from "./columns";
import { DataTable } from "./data-table";
import API from "../../../api/axios";
import { useState, useEffect } from "react";
import { CardContent, CardFooter } from "../../ui/card";
import { useTranslation } from "react-i18next";

export default function DemoPage({ RoundId, handleStartRound }) {
    const { t, i18n } = useTranslation("global");
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
        <div>

            <CardContent>
                <div className="container py-10">
                    <DataTable columns={columns(RoundId, setContributions,t)} data={contributions} handleStartRound={handleStartRound} />
                </div>
            </CardContent>
            {
                contributions &&
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        <strong>1-10</strong> {t("contributionTable.of")} <strong>{contributions.length}</strong> {t("contributionTable.contributions")}
                    </div>
                </CardFooter>
            }
        </div>
    );
}
