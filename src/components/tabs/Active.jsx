import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { TabsContent   } from "@/components/ui/tabs";
import ActiveEqubRound from "../../pages/ActiveEqubRounde";
export default function Active() {
  return (
    <TabsContent value="active">
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Last Equb Round</CardTitle>
        <CardDescription>Last Equb Round Payment History</CardDescription>
      </CardHeader>
      <CardContent>
        <ActiveEqubRound/>
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
