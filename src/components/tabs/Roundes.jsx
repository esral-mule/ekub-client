import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../ui/card";
import { TabsContent   } from "../ui/tabs";
import EqubRounds from "./content/EqubRoundes";
export default function Roundes() {
  return (
    <TabsContent value="roundes">
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Equb Rounds</CardTitle>
        <CardDescription>Select Equb-round to see history</CardDescription>
      </CardHeader>

        <EqubRounds />

    </Card>
  </TabsContent>
  )
}
