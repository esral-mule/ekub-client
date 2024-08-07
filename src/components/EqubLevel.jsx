import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import { Button } from "./ui/button";
import CreateEqubLevel from "./CreateEqubLevel";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
export default function EqubLevel() {
  let { id } = useParams();

  const [equblevels, setEqubLevels] = useState([]);
  useEffect(() => {
    API.get(`/equb-level/etype/${id}`).then(data=>{
        setEqubLevels(data.data.data)
        console.log(data);
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
          <TableCaption>A list of your recent invoices.</TableCaption>
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
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
