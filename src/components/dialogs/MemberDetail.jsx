import { User } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../ui/button";
import {useState} from 'react'
export default function MemberDetail({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          className="bg-primary ml-auto print:hidden mb-[1px] w-full"
        >
          <User size={18} className="pr-1" />
          Detail
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] p-6 rounded-md shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Member Detail
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            Detailed information about the selected member.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 max-h-52 overflow-y-scroll">
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold">Full Name:</p>
            <p className="text-md">{user.member.fullName}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold ">Phone Number:</p>
            <p className="text-md ">{user.member.phoneNumber}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold ">Username:</p>
            <p className="text-md ">{user.member.username}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold ">Equb Type:</p>
            <p className="text-md ">{user.equbType.name}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold ">Equb Level:</p>
            <p className="text-md ">{user.equbLevel.title}</p>
          </div>
          <div className="border-b pb-2 flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold ">Unique ID:</p>
            <p className="text-md ">{user.uniqueId.uniqueId}</p>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <p className="text-sm font-bold">Active Status:</p>
            <p
              className={`text-md ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      <AlertDialogFooter className="mb-4">
        <Button size="xs" variant="secondary" onClick={() => setOpen(false)}>
          Close
        </Button>
      </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
