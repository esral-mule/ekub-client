import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useToast } from "./ui/use-toast";
import { Card, CardDescription, CardHeader } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useTranslation } from "react-i18next";

export default function WinnerDetail({ round }) {
  const { t } = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const [benefficiary, setBenefficiary] = useState(null);
  const { toast } = useToast();

  const CalculateTotla = (members) => {
    let sum = 0;
    for (let index = 0; index < members.length; index++) {
      sum = sum + members[index].equbLevel.contribution;
    }
    return sum;
  };

  useEffect(() => {
    setIsLoading(true);
    API.get(`/beneficiary/round/${round._id}`)
      .then((res) => {
        setBenefficiary(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: "couldn't fetch the winner",
        });
      });
  }, []);

  return (
    <Card>
      <CardHeader>{t("winner.title")}</CardHeader>
      <CardDescription>
        {benefficiary && (
          <span className="block mb-5 -mt-5">
            {t("winner.des")}
            <span className="text-green-400 px-2 text-lg">
              {benefficiary.uniqueId.uniqueId}
            </span>
          </span>
        )}
      </CardDescription>

      {isLoading ? (
        <Loader2 className="mx-auto h-4 w-4 animate-spin pb-5" />
      ) : (
        benefficiary &&
        benefficiary.uniqueId.members &&
        (benefficiary.uniqueId.members.length > 0 ? (
          <div>
            <p className="p-3 border border-b-1">{t("uniqueIdDetail.title")}</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("uniqueIdDetail.fullName")}</TableHead>
                  <TableHead>{t("uniqueIdDetail.level")}</TableHead>
                  <TableHead className="text-right">
                    {t("uniqueIdDetail.amount")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benefficiary.uniqueId.members.map((detail) => (
                  <TableRow key={detail._id}>
                    <TableCell className="font-medium">
                      {detail.member.fullName}
                    </TableCell>
                    <TableCell>{detail.equbLevel.title}</TableCell>
                    <TableCell className="text-right">
                      {detail.equbLevel.contribution}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>{t("uniqueIdDetail.total")}</TableCell>
                  <TableCell className="text-right">
                    {CalculateTotla(benefficiary.uniqueId.members)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        ) : (
          <div className="text-center">{t("uniqueIdDetail.noMember")}</div>
        ))
      )}
    </Card>
  );
}
