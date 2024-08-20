import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import ActiveEqubRound from "./content/ActiveEqubRounde";
export default function Active() {
  return (
    <TabsContent value="active">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Last Equb Round</CardTitle>
          <CardDescription>Last Equb Round Payment History</CardDescription>
        </CardHeader>

        <ActiveEqubRound />
      </Card>
    </TabsContent>
  );
}
