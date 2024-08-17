import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import DemoPage from "../equb/page";
import AddMember from "../addMember";
import { useParams } from "react-router";
import API from "../../api/axios";
import { useState, useEffect } from "react";
import ConfirmAddToActive from "../ConfirmAddToActive";

export default function AllMembers() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMembership, setNewMembership] = useState(false);

  useEffect(() => {
    API.get(`/membership/etype/${id}`, {})
      .then((data) => {
        setData(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <TabsContent value="all">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>

          <CardTitle>Memeber list</CardTitle>
          <CardDescription>All Equb member list</CardDescription>
        </CardHeader>
        <CardContent className="p-0 md:p-6">
          <DemoPage
            id={id}
            data={data}
            isLoading={isLoading}
            setData={setData}
            setNewMembership={setNewMembership}
          />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>

      {newMembership && (
        <ConfirmAddToActive
        newMembership={newMembership}
          setNewMembership={setNewMembership}
        />
      )}
    </TabsContent>
  );
}
