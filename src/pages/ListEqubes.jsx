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


export default function ListEqubes() {

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
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        {/* <Button className="self-end">Add Equb Level</Button> */}
        <CardTitle>List of Equbes</CardTitle>
        <CardDescription>List of all Equb's of the house</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all your equbes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Contribution</TableHead>
              <TableHead className="text-center">MaxUniqueIds</TableHead>
              <TableHead className="text-center">LotteryDay</TableHead>
              <TableHead className="text-center">ContributionDay</TableHead>
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
          Showing {equbs.length} equbes
        </div>
      </CardFooter>
    </Card>
  );
}
