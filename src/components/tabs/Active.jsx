import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import ActiveEqubRound from "./content/ActiveEqubRounde";
import { useTranslation } from "react-i18next";
export default function Active() {
  const { t, i18n } = useTranslation("global");
  return (
    <TabsContent value="active">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t("tabs.active.title")}</CardTitle>
          <CardDescription>{t("tabs.active.des")}</CardDescription>
        </CardHeader>

        <ActiveEqubRound />
      </Card>
    </TabsContent>
  );
}
