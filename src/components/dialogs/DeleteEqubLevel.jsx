import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useToast } from "../ui/use-toast";
import { useParams } from "react-router";

export default function DeleteEqubLevel({ equbLevel, setEqubLevels }) {
  let { id } = useParams();

  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    API.get(`/round/etype/${id}`)
      .then((data) => {
        data = data.data.data;
        let activeRound = data.filter((round) => round.closed === false)[0];
        return activeRound;
      })
      .then((activeRound) => {
        if (activeRound) {
          API.get(`/contribution/round/${activeRound._id}`).then((data) => {
            setContributions(
              data.data.data.filter((contribution) => {
                return contribution.member.equbLevel._id === equbLevel;
              })
            );
            setLoading(false);
          });
        }
      })
      .catch(setLoading(false));
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    API.delete(`/equb-level/${equbLevel}`)
      .then(() => {
        toast({
          title: "Delete Equb level",
          description: "Deleted Equb level successfuly",
        });
        setOpenModal(false);
      })
      .then(() => {
        API.get(`/equb-level/etype/${id}`).then((data) => {
          setEqubLevels(data.data.data);
        });
      })
      .catch(() => {
        toast({
          title: "Delete Equb level",
          description: "Delete Equb level Failed",
        });
      });
  };
  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          onClick={() => {
            setOpenModal(true);
          }}
          className="ml-auto print:hidden mr-1 w-full bg-destructive"
        >
          <Trash2 size={18} className="pr-1" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <p className="pl-1">Delete Equb level</p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please make sure you want to delete{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : (
            contributions && (
              <Card className="max-h-[calc(100vh-30rem)] overflow-y-scroll">
                {contributions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contributions.map((contribution) => (
                        <TableRow key={contribution._id}>
                          <TableCell className="font-medium">
                            {contribution.member.member.fullName}
                          </TableCell>
                          <TableCell>
                            {contribution.member.equbLevel.title}
                          </TableCell>
                          <TableCell className="text-right">
                            {contribution.member.equbLevel.contribution}
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
        <AlertDialogFooter>
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
            onClick={handleDelete}
            type="submit"
          >
            <span>Delete</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
