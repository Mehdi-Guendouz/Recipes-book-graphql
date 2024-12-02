import { ingredientsType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const ingredientsColumn: ColumnDef<ingredientsType>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="flex items-center justify-start">ID</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start">{row.original.id}</div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => {
      return <div className="flex items-center justify-start">Name</div>;
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
    header: () => {
      return <div className="flex items-center justify-start">Recipes</div>;
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
