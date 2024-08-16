import * as React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CircleCheckBig, CircleX, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"

import TogglePayment from "./TogglePayment"

export type User = {
  _id: string,
  member: object,
  isPaid: boolean,
  round: object,
  createdAt: Date,
  updatedAt: Date,

}
const handlePaymentStatusChange = (e) => {

}
export const columns: ColumnDef<User>[] = [

  {
    accessorKey: "fullName",
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
      )
    },
    cell: ({ row }) => {

      return <div className="font-medium">{row.original.member.member.fullName}</div>

    }
  },
  {
    accessorKey: "phoneNumber",
    header: ({ }) => {
      return (
        <div>Phone Number</div>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.member.member.phoneNumber}</div>

    }
  },
  {
    accessorKey: "isPaid",
    header: () => <div>Status</div>,
    cell: ({ row }) => {

      return <div className="flex justify-center" style={{ "color": !row.original.isPaid ? "#b91c1c" : "#166534" }}>
        {row.original.isPaid ?
          <div>
            <CircleCheckBig className="mx-auto" size={20} />
            <p>paid</p>
          </div>
          :
          <div className="flex justify-center gap-1">
            <CircleX size={20} />
            <p className="hidden sm:flex">Unpaid</p>
          </div>
        }

      </div>
    },
  },
  // {
  //   accessorKey: "uniqueId",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="text-right"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Unique Id
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {

  //     return <div className="font-medium">{row.original.uniqueId.uniqueId}</div>
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original


      return (
        <TogglePayment id={row.original._id} status={row.original.isPaid} />
      )
    },
  },
]
