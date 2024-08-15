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
import { useParams } from "react-router";
import CreateEqubLevel from "./CreateEqubLevel";


export default function EqubLevel() {
  let { id } = useParams();

  const [equblevels, setEqubLevels] = useState([]);
  useEffect(() => {
    API.get(`/equb-level/etype/${id}`).then(data=>{
        setEqubLevels(data.data.data)
    }).catch((err)=>{
        console.log(err);
    });
  }, []);
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        {/* <Button className="self-end">Add Equb Level</Button> */}
        <CreateEqubLevel/>
        <CardTitle>Equb Levels</CardTitle>
        <CardDescription>List of all Equb levels</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Contribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equblevels.map((level) => (
              <TableRow key={level._id}>
                <TableCell>{level.title}</TableCell>
                <TableCell className="text-center">
                  {level.contribution}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing {equblevels.length} Equb levels
        </div>
      </CardFooter>
    </Card>
  );
}
