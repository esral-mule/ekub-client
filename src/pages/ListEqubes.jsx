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
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import Transition from "../components/Transition";
import { useTranslation } from "react-i18next";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import DeleteEqub from "../components/dialogs/DeleteEqub";

export default function ListEqubes() {
  const { t } = useTranslation("global");
  let navigate = useNavigate();
  const [equbs, setEqubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 const getEqubs = ()=>{
    setIsLoading(true);
    API.get("/equb-type/", {})
      .then((data) => {
        setIsLoading(false);
        setEqubs(data.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }
  useEffect(() => {
    getEqubs()
  }, []);

  const handleSelect = (id) => {
    navigate(`/equbdetail/${id}`);
  };

  return (
    <Transition>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t("ListEqubes.title")}</CardTitle>
          <CardDescription>{t("ListEqubes.des")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">
                    {t("ListEqubes.table.name")}
                  </TableHead>
                  <TableHead className="text-center">
                    {t("ListEqubes.table.contribution")}
                  </TableHead>
                  <TableHead className="text-center">
                    {t("ListEqubes.table.maxUniqueIds")}
                  </TableHead>
                  <TableHead className="text-center">
                    {t("ListEqubes.table.lotteryDay")}
                  </TableHead>
                  <TableHead className="text-center">
                    {t("ListEqubes.table.contributionDay")}
                  </TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equbs.map((equb) => (
                  <TableRow
                    key={equb._id}
                    onClick={() => {
                      handleSelect(equb._id);
                    }}
                  >
                    <TableCell>{capitalizeFirstLetter(equb.name)}</TableCell>
                    <TableCell className="text-center">
                      {equb.contribution}
                    </TableCell>
                    <TableCell>{equb.maxUniqueIds}</TableCell>
                    <TableCell>{equb.lotteryDay}</TableCell>
                    <TableCell>{equb.contributionDay}</TableCell>
                    <TableCell>
                      {/* Add Action dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <DeleteEqub equb={equb} getEqubs={getEqubs}/>
                          </DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          {equbs && (
            <div className="text-xs text-muted-foreground">
              {equbs.length} {t("ListEqubes.table.numberOfequbes")}
            </div>
          )}
        </CardFooter>
      </Card>
    </Transition>
  );
}
