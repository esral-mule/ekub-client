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
import AllMembers from "../components/tabs/AllMembers";
import Roundes from "../components/tabs/Roundes";
import Active from "../components/tabs/Active";
import EqubLevels from "../components/tabs/EqubLevels";
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
            </div>
          </div>
          <AllMembers/>
          <Roundes/>
          <Active/>
          <EqubLevels/>
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
