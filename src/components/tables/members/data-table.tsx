import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import AddMember from "../../dialogs/addMember"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { useTranslation } from "react-i18next"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    getMembers,
    setNewMembership,
    getActiveRound
}

export function DataTable<TData, TValue>({
    columns,
    data,
    getMembers,
    setNewMembership,
    getActiveRound
}: DataTableProps<TData, TValue>) {
    const { t } = useTranslation("global");
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})

    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
    })

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder={t("tabs.members.searchPlaceHolder")}
                    value={(table.getColumn(t("membersTable.fullName"))?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(t("membersTable.fullName"))?.setFilterValue(event.target.value)
                    }
                    className="w-96 hidden md:inline print:hidden"
                />



                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="print:hidden ml-1">
                            {t("tabs.members.columns")}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >


                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <AddMember
                    getMembers={getMembers}
                    setNewMembership={setNewMembership}
                    getActiveRound={getActiveRound}
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-center">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="print:hidden"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="print:hidden"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}