import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";

export default function DeleteEqubLevel() {
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          size="xs"
          onClick={() => {
            setOpenModal(true);
          }}
          className="ml-auto print:hidden mr-1 w-full bg-destructive"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <p className="pl-1">Delete Equb level</p>
          </DialogTitle>
          <DialogDescription>
            Please make sure you want to delete{" "}
          </DialogDescription>
        </DialogHeader>
        <div>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : (
            members && (
              <Card>
                {members.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((detail) => (
                        <TableRow key={detail._id}>
                          <TableCell className="font-medium">
                            {detail.member.fullName}
                          </TableCell>
                          <TableCell>{detail.equbLevel.title}</TableCell>
                          <TableCell className="text-right">
                            {detail.equbLevel.contribution}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center">
                    No Member is assigned to this UniqueId
                  </div>
                )}
              </Card>
            )
          )}
        </div>
        <DialogFooter>
          <Button
            className="h-8 gap-1 bg-primary"
            onClick={() => {
              setOpenModal(false);
            }}
            type="submit"
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="h-8 gap-1 bg-destructive"
            // onClick={handleSubmit}
            type="submit"
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
