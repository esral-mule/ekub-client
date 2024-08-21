import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function MemberDetail({ user }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="xs"
          className="bg-primary ml-auto print:hidden mb-[1px] w-full"
        >
          Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Member Detail
          </DialogTitle>
          <DialogDescription className="text-sm">
            Detailed information about the selected member.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
