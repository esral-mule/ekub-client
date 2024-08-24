import { useTranslation } from "react-i18next";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { TabsContent } from "../ui/tabs";
import EqubRounds from "./content/EqubRoundes";
export default function Roundes() {
  const { t, i18n } = useTranslation("global");

  return (
    <TabsContent value="roundes">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t("roundes.title")}</CardTitle>
          <CardDescription>{t("roundes.des")}</CardDescription>
        </CardHeader>

        <EqubRounds />
      </Card>
    </TabsContent>
  );
}
