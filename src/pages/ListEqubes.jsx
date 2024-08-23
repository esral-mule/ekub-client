import {
  Table,
  TableBody,
  TableCaption,
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


export default function ListEqubes() {
  const { t, i18n } = useTranslation("global");
  let navigate = useNavigate();
  const [equbs, setEqubs] = useState([]);
  useEffect(() => {
    API.get("/equb-type/", {})
      .then((data) => {
        setEqubs(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelect = (id)=>{
    navigate(`/equbdetail/${id}`);
  }
  return (
    <Transition>

    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        {/* <Button className="self-end">Add Equb Level</Button> */}
        <CardTitle>{t('ListEqubes.title')}</CardTitle>
        <CardDescription>{t('ListEqubes.des')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">{t('ListEqubes.table.name')}</TableHead>
              <TableHead className="text-center">{t('ListEqubes.table.contribution')}</TableHead>
              <TableHead className="text-center">{t('ListEqubes.table.maxUniqueIds')}</TableHead>
              <TableHead className="text-center">{t('ListEqubes.table.lotteryDay')}</TableHead>
              <TableHead className="text-center">{t('ListEqubes.table.contributionDay')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equbs.map((equb) => (
              <TableRow key={equb._id} onClick={()=>{
                handleSelect(equb._id)
              }}>
                <TableCell>{capitalizeFirstLetter(equb.name)}</TableCell>
                <TableCell className="text-center">
                  {equb.contribution}
                </TableCell>
                <TableCell>{equb.maxUniqueIds}</TableCell>
                <TableCell>{equb.lotteryDay}</TableCell>
                <TableCell>{equb.contributionDay}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
           {equbs.length} {t('ListEqubes.table.numberOfequbes')}
        </div>
      </CardFooter>
    </Card>
    </Transition>

  );
}
