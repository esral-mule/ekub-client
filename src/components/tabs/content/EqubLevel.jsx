import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";
import DeleteEqubLevel from "../../dialogs/DeleteEqubLevel";
import { useTranslation } from "react-i18next";
// import DeleteEqubLevel from "./DeleteEqubLevel"
export default function EqubLevel() {
  
  let { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const [equblevels, setEqubLevels] = useState([]);
  useEffect(() => {
    API.get(`/equb-level/etype/${id}`)
      .then((data) => {
        setEqubLevels(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>{t("equbLevels.title")}</CardTitle>
        <CardDescription>{t("equbLevels.des")}</CardDescription>
        <CreateEqubLevel fromTab={true} setEqubLevels={setEqubLevels} />
      </CardHeader>
      <CardContent>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">{t("equbLevels.levelTitle")}</TableHead>
                <TableHead className="text-center">{t("equbLevels.contribution")}</TableHead>
                <TableHead className="text-center">{t("equbLevels.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equblevels.map((level) => (
                <TableRow key={level._id}>
                  <TableCell>{level.title}</TableCell>
                  <TableCell className="text-center">
                    {level.contribution}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DeleteEqubLevel
                          equbLevel={level._id}
                          setEqubLevels={setEqubLevels}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          {equblevels.length} {t("equbLevels.equbLevels")}
        </div>
      </CardFooter>
    </Card>
  );
}
