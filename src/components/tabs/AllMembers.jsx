import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import DemoPage from "../tables/members/page";
import { useParams } from "react-router";
import API from "../../api/axios";
import { useState, useEffect } from "react";
import ConfirmAddToActive from "../dialogs/ConfirmAddToActive";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

export default function AllMembers() {
  let { id } = useParams();
  const { t } = useTranslation("global");
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newMembership, setNewMembership] = useState(false);
  const [activeRound, setActiveRound] = useState(null);

  const getMembers = ()=>{
    setIsLoading(true)
    API.get(`/membership/etype/${id}`, {})
      .then((data) => {
        setMembers(data.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getMembers()
  }, []);

  return (
    <TabsContent value="all">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t("tabs.members.title")}</CardTitle>
          <CardDescription>{t("tabs.members.des")}</CardDescription>
        </CardHeader>
        <CardContent className="p-0 md:p-6">
          {isLoading ? (
            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          ) : (
            <DemoPage
              id={id}
              members={members}
              isLoading={isLoading}
              getMembers={getMembers}
              setNewMembership={setNewMembership}
              setActiveRound={setActiveRound}
            />
          )}
        </CardContent>
        <CardFooter>
          {members && (
            <div className="text-xs text-muted-foreground">
              <strong>1-10</strong> {t("tabs.members.of")}{" "}
              <strong>{members.length}</strong> {t("tabs.members.members")}
            </div>
          )}
        </CardFooter>
      </Card>

      {newMembership && activeRound && (
        <ConfirmAddToActive
          newMembership={newMembership}
          setNewMembership={setNewMembership}
        />
      )}
    </TabsContent>
  );
}
