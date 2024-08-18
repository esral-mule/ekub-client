import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { TabsContent   } from "@/components/ui/tabs";
import EqubRounds from "../../pages/EqubRoundes";
export default function Roundes() {
  return (
    <TabsContent value="roundes">
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Equb Rounds</CardTitle>
        <CardDescription>Select Equb-round and Equb-cycle to see history</CardDescription>
      </CardHeader>

        <EqubRounds />

    </Card>
  </TabsContent>
  )
}
