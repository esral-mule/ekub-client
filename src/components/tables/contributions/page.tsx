import { columns } from "./columns";
import { DataTable } from "./data-table";
import API from "../../../api/axios";
import { useState, useEffect } from "react";
import { CardContent, CardFooter } from "../../ui/card";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

export default function DemoPage({ RoundId, handleStartRound }) {
    const { t, i18n } = useTranslation("global");
    const [contributions, setContributions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        API.get(`/contribution/round/${RoundId}`)
            .then((data) => {
                setContributions(data.data.data);
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
            });
    }, [RoundId]);

    return (
        <div>

            <CardContent>
                <div className="container py-10">
                    {
                        isLoading ?
                            <Loader2 className="mx-auto h-4 w-4 animate-spin" /> :


                            <DataTable columns={columns(RoundId, setContributions, t)} data={contributions} handleStartRound={handleStartRound} />
                    }
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
