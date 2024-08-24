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

export default function AllMembers() {
  let { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMembership, setNewMembership] = useState(false);

  useEffect(() => {
    API.get(`/membership/etype/${id}`, {})
      .then((data) => {
        setData(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <TabsContent value="all">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>

          <CardTitle>{t("tabs.members.title")}</CardTitle>
          <CardDescription>{t("tabs.members.des")}</CardDescription>
        </CardHeader>
        <CardContent className="p-0 md:p-6">
          <DemoPage
            id={id}
            data={data}
            isLoading={isLoading}
            setData={setData}
            setNewMembership={setNewMembership}
          />
        </CardContent>
        <CardFooter>
          {
            data &&
            <div className="text-xs text-muted-foreground">
            <strong>1-10</strong> {t("tabs.members.of")} <strong>{data.length}</strong> {t("tabs.members.memebers")}
          </div>
          }
        </CardFooter>
      </Card>

      {newMembership && (
        <ConfirmAddToActive
        newMembership={newMembership}
          setNewMembership={setNewMembership}
        />
      )}
    </TabsContent>
  );
}
