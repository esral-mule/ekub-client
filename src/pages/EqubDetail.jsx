import { useParams } from "react-router";
import DemoPage from "../components/equb/page";
import { NavLink } from "react-router-dom";
import EqubRoundes from "../pages/EqubRoundes";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Badge,
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateUser from "../components/CreateUser";
import AddMember from "../components/addMember";
import EqubLevel from "../components/EqubLevel";
import ActiveEqubRound from "./ActiveEqubRounde";
export default function EqubDetail() {
  let { id } = useParams();
  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All Members</TabsTrigger>
              <TabsTrigger value="roundes">Roundes</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="equblevels" className="hidden sm:flex">
                Equb Levels
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <CreateUser />
              <AddMember />
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
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

          <TabsContent value="roundes">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Equb Rounds</CardTitle>
                <CardDescription>Select Equb-round and Equb-cycle to see history</CardDescription>
              </CardHeader>
              <CardContent>
                <EqubRoundes />
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

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


          <TabsContent value="equblevels">
            <EqubLevel/>
          </TabsContent>
        </Tabs>
      </main>
      <div>
        <NavLink
          to={`/roundes/${id}`}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Roundes
        </NavLink>
      </div>
    </div>
  );
}
