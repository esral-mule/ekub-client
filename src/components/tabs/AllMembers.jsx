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

export default function AllMembers() {
  let { id } = useParams();

  return (
    <TabsContent value="all">
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <AddMember/>
        <CardTitle>Memeber list</CardTitle>
        <CardDescription>All Equb member list</CardDescription>
      </CardHeader>
      <CardContent>
        <DemoPage id={id} />
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
