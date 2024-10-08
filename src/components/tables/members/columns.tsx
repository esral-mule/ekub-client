import * as React from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DeleteMember from "../../dialogs/DeleteMember"
import MemberDetail from "../../dialogs/MemberDetail"
import { useTranslation } from "react-i18next";

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

export function getColumns(getMembers, t) {

  return [
    {
      accessorFn: (row) => row.member.fullName,
      id: t("membersTable.fullName"),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >

            {t("membersTable.fullName")}
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
      id: t("membersTable.phoneNumber"),
      header: () => {
        return <div>
          {t("membersTable.phoneNumber")}
        </div>;
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.member.phoneNumber}</div>;
      },
    },
    {
      accessorFn: (row) => row.equbLevel.title,
      id: t("membersTable.level"),
      header: () => <div>{t("membersTable.level")}</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.equbLevel.title}</div>;
      },
    },
    {
      accessorFn: (row) => row.uniqueId.uniqueId,
      id: t("membersTable.uniqueId"),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("membersTable.uniqueId")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.uniqueId.uniqueId}</div>;
      },
    },
    {
      id: t("membersTable.actions"),
      header: t("membersTable.actions"),
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
              <MemberDetail user={user} />
              <DeleteMember user={user} getMembers={getMembers} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
