import * as React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Checkbox } from "../ui/checkbox"
import { NavLink } from "react-router-dom"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import BanAction from "./BanAction"


export type User = {
        _id: string,
        member: object,
        isPaid: boolean,
        round: object,
        createdAt: Date,
        updatedAt: Date,

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
    header: () => <div>isPaid</div>,
    cell: ({ row }) => {
     
      return <div className="font-medium">{row.original.isPaid.toString()}</div>
    },
  }
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
  // {
  //   id: "actions",
  //   header:"Actions",
  //   cell: ({ row }) => {
  //     const user = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(user._id)}
  //           >
  //             Copy User ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>

  //             <NavLink
  //               to={`/userdetail/${user._id}`}
  //               className="px-2 hover:text-gray-400"
  //             >
  //               View User Detail
  //             </NavLink>
  //           </DropdownMenuItem>
  //           <BanAction id={user._id} equbId={user.equbType}/>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
