import { ingredientsType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const ingredientsColumn: ColumnDef<ingredientsType>[] = [
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
    accessorKey: "recipes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 "
        >
          List of Recipes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const recipes = row.original.recipes;
      return (
        <div className="flex items-center justify-start">
          {recipes.length > 0 ? (
            <div>
              <div className="flex flex-wrap gap-2">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex flex-wrap items-center justify-center bg-primary-green-dark text-white px-2 py-1 rounded-md"
                  >
                    {recipe.title}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-primary-grey-100">
              No recipes be the first to use it
            </div>
          )}
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
        <div className="flex items-center justify-start">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => console.log(row.original)}
          >
            Edit
          </button>
        </div>
      );
    },
  },
];
