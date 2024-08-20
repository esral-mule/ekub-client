import * as React from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DeleteMember from "../../dialogs/DeleteMember"
import MemberDetail from "../../dialogs/MemberDetail"

export type User = {
  _id: string;
  member: {
    fullName: string;
    phoneNumber: string;
  };
  equbType: object;
  equbLevel: {
    title: string;
  };
  uniqueId: {
    uniqueId: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export function getColumns(setData) {
  return [
    {
      accessorFn: (row) => row.member.fullName,
      id: "fullName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.member.fullName}</div>;
      },
    },
    {
      accessorFn: (row) => row.member.phoneNumber,
      id: "phoneNumber",
      header: () => {
        return <div>Phone Number</div>;
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.member.phoneNumber}</div>;
      },
    },
    {
      accessorFn: (row) => row.equbLevel.title,
      id: "title",
      header: () => <div>Level</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.equbLevel.title}</div>;
      },
    },
    {
      accessorFn: (row) => row.uniqueId.uniqueId,
      id: "uniqueId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Unique Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.uniqueId.uniqueId}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <MemberDetail user={user}/>
              <DeleteMember user={user}  setData={setData}/>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
