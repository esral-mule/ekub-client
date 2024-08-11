import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { TabsContent   } from "@/components/ui/tabs";
import DemoPage from "../equb/page";
import AddMember from "../addMember";
import { useParams } from "react-router";
import API from "../../api/axios";
import { useState, useEffect } from "react";

export default function AllMembers() {
  let { id } = useParams();
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {        
      API.get(`/membership/etype/${id}`, {
      })
          .then((data) => {              
              setData(data.data.data);
              setIsLoading(false);
          }).catch(err => {
              setIsLoading(false);
          })
  }, [])


  return (
    <TabsContent value="all">
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <AddMember setData={setData}/>
        <CardTitle>Memeber list</CardTitle>
        <CardDescription>All Equb member list</CardDescription>
      </CardHeader>
      <CardContent>
        <DemoPage id={id} data={data} isLoading={isLoading} setData={setData}/>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  </TabsContent>
  )
}
