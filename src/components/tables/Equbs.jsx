import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteEqub from "./../dialogs/DeleteEqub";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { MoreHorizontal } from "lucide-react";

export default function Equbs({ equbs, getEqubs }) {
  const { t } = useTranslation("global");
  let navigate = useNavigate();
  const handleSelect = (id) => {
    navigate(`/equbdetail/${id}`);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">
            {t("ListEqubes.table.name")}
          </TableHead>
          <TableHead className="text-center">
            {t("ListEqubes.table.contribution")}
          </TableHead>
          <TableHead className="text-center">
            {t("ListEqubes.table.maxUniqueIds")}
          </TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equbs.map((equb) => (
          <TableRow
            key={equb._id}
            onClick={() => {
              handleSelect(equb._id);
            }}
          >
            <TableCell>{capitalizeFirstLetter(equb.name)}</TableCell>
            <TableCell className="text-center">{equb.contribution}</TableCell>
            <TableCell>{equb.maxUniqueIds}</TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <DeleteEqub equb={equb} getEqubs={getEqubs} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
