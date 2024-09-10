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
import { useTranslation } from "react-i18next";

export default function DeleteEqubLevel({ equbLevel, getEqubLevels }) {
  let { id } = useParams();
  const { t } = useTranslation("global");
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
        getEqubLevels();
      })
      .catch(() => {
        toast({
          variant: "destructive",
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
          variant="destructive"
          onClick={() => {
            setOpenModal(true);
          }}
          className="ml-auto print:hidden mr-1 w-full"
        >
          <Trash2 size={18} className="pr-1" />
          {t("deleteEqubLevel.delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95%] sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <p className="pl-1">{t("deleteEqubLevel.title")}</p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteEqubLevel.des")}
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
                        <TableHead>{t("deleteEqubLevel.fullName")}</TableHead>
                        <TableHead>{t("deleteEqubLevel.level")}</TableHead>
                        <TableHead className="text-right">
                          {t("deleteEqubLevel.amount")}
                        </TableHead>
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
                    {t("deleteEqubLevel.noMember")}
                  </div>
                )}
              </Card>
            )
          )}
        </div>
        <AlertDialogFooter>
          <div className="flex gap-x-1 justify-end">
            <Button
              className="h-8 bg-primary"
              onClick={() => {
                setOpenModal(false);
              }}
              type="submit"
            >
              <span>{t("deleteEqubLevel.cancel")}</span>
            </Button>
            <Button
              variant="destructive"
              className="h-8"
              onClick={handleDelete}
              type="submit"
            >
              <span>{t("deleteEqubLevel.delete")}</span>
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
