import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheckBig, CircleX } from "lucide-react";
import { Button } from "../../ui/button";
import TogglePayment from "./TogglePayment";

export type User = {
  _id: string;
  member: {
    member: {
      fullName: string;
      phoneNumber: string;
    };
    equbLevel: {
      contribution: number;
    }
  };
  isPaid: boolean;
  round: object;
  createdAt: Date;
  updatedAt: Date;
};

export const columns = (getContributions, t): ColumnDef<User>[] => [
  {
    accessorFn: (row) => row.member.member.fullName,
    id: t("contributionTable.fullName"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-right"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("contributionTable.fullName")}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.member.member.fullName}</div>;
    },
  },
  {
    accessorFn: (row) => row.member.member.phoneNumber,
    id: t("contributionTable.phoneNumber"),
    header: () => {
      return <div>{t("contributionTable.phoneNumber")}</div>;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.member.member.phoneNumber}</div>;
    },
  },

  {
    accessorFn: (row) => row.member.equbLevel.contribution,
    id: t("contributionTable.contribution"),
    header: () => {
      return <div>{t("contributionTable.contribution")}</div>;
    },
    cell: ({ row }) => {

      return   <div className="font-medium whitespace-nowrap">{`${row.original.member.equbLevel.contribution} ${row.original.punishment !== 0 && row.original.punishment!==undefined  ? `+ ${row.original.punishment}` : ''}`}
    </div>;
    },
  },

  {
    accessorKey: "isPaid",
    id: t("contributionTable.status"),
    header: () => <div>{t("contributionTable.status")}</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center" style={{ color: !row.original.isPaid ? "#b91c1c" : "#166534" }}>
          {row.original.isPaid ? (
            <div className="flex justify-center gap-1">
              <CircleCheckBig className="mx-auto" size={20} />
              <p className="flex">{t("contributionTable.paid")}</p>
            </div>
          ) : (
            <div className="flex justify-center gap-1">
              <CircleX size={20} />
              <p className="flex">{t("contributionTable.unpaid")}</p>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: t("contributionTable.actions"),
    header: t("contributionTable.actions"),
    cell: ({ row }) => {
      return <TogglePayment contribution={row.original} status={row.original.isPaid} getContributions={getContributions} />;
    },
  },
];
