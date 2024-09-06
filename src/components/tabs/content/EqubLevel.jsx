import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useParams } from "react-router";
import CreateEqubLevel from "../../dialogs/CreateEqubLevel";
import EqubLevels from "../../tables/EqubLevels";
import { useTranslation } from "react-i18next";
import { TabsContent } from "../../ui/tabs";
import { Loader2 } from "lucide-react";

export default function EqubLevel() {
  let { id } = useParams();
  const { t } = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const [equblevels, setEqubLevels] = useState([]);

  const getEqubLevels = () => {
    setIsLoading(true);
    API.get(`/equb-level/etype/${id}`)
      .then((data) => {
        setIsLoading(false);
        setEqubLevels(data.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getEqubLevels();
  }, []);

  return (
    <TabsContent value="equblevels">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t("equbLevels.title")}</CardTitle>
          <CardDescription>{t("equbLevels.des")}</CardDescription>
          <CreateEqubLevel fromTab={true} setEqubLevels={setEqubLevels} />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          ) : (
            <Card>
              <EqubLevels
                equblevels={equblevels}
                getEqubLevels = {getEqubLevels}
              />
            </Card>
          )}
        </CardContent>
        <CardFooter>
          {equblevels && (
            <div className="text-xs text-muted-foreground">
              {equblevels.length} {t("equbLevels.equbLevels")}
            </div>
          )}
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
