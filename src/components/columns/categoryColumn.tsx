import { categoryType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import AlertDialogModal from "../modal/AlertDialogModal";
import AddCategoryModal from "../modal/AddCategoryModal";

export const categoriesColumn: ColumnDef<categoryType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 "
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start">{row.original.id}</div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 "
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start">
          {row.original.name}
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => {
      return <div className="flex items-center justify-start">Actions</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-1">
          <AddCategoryModal isEdit category={row.original} />
          <AlertDialogModal
            text={row.original.name}
            id={row.original.id}
            isCategoryDeleted
          />
        </div>
      );
    },
  },
];
