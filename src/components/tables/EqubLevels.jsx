import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "..//ui/button";
import DeleteEqubLevel from "../dialogs/DeleteEqubLevel";
import { useTranslation } from "react-i18next";
export default function EqubLevels({equblevels,getEqubLevels}) {
  const { t } = useTranslation("global");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">
            {t("equbLevels.levelTitle")}
          </TableHead>
          <TableHead className="text-center">
            {t("equbLevels.contribution")}
          </TableHead>
          <TableHead className="text-center">
            {t("equbLevels.actions")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equblevels.map((level) => (
          <TableRow key={level._id}>
            <TableCell>{level.title}</TableCell>
            <TableCell className="text-center">{level.contribution}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DeleteEqubLevel
                    equbLevel={level._id}
                    getEqubLevels={getEqubLevels}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
