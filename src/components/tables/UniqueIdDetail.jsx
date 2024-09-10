import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card } from "../ui/card";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
// Assume you have a Spinner component for loading state

export default function UniqueIdDetail({ uniqueID ,equbLevel,setIsFull}) {
  const { t } = useTranslation("global");   

  const [uniqueIDDetail, setUniqueIdDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [equbType ,setEqubType] = useState(null)

  const CalculateTotla = (members) => {
    let sum = 0;
    for (let index = 0; index < members.length; index++) {
      sum =sum + members[index].equbLevel.contribution;
    }
    return sum;
  };

  
  useEffect(() => {
    setLoading(true);

    API.get(`/uniqueid/${uniqueID}`)
      .then((res) => {
        const data = res.data.data
        
        setEqubType(data.equbType)
        if(equbLevel){
          const isFull = (CalculateTotla(data.members) + equbLevel.contribution) >= data.equbType.contribution;
          setIsFull(isFull)
        }
        setUniqueIdDetail(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching unique ID details:", err);
        setLoading(false);
      });
  }, [uniqueID,equbLevel]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        uniqueIDDetail && (
          <Card className="max-h-[calc(100vh-30rem)] overflow-y-scroll">
            {uniqueIDDetail.members.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("uniqueIdDetail.fullName")}</TableHead>
                    <TableHead>{t("uniqueIdDetail.level")}</TableHead>
                    <TableHead className="text-right">{t("uniqueIdDetail.amount")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uniqueIDDetail.members.map((detail) => (
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
                      {CalculateTotla(uniqueIDDetail.members)} / {equbType.contribution}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ) : (
              <div className="text-center">
                {t("uniqueIdDetail.noMember")}
              </div>
            )}
          </Card>
        )
      )}
    </div>
  );
}
