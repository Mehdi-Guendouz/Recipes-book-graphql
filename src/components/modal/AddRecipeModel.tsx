import { useEffect, useState, useTransition } from "react";
import Modal from "./Modal";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle } from "../ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { recipeSchema, recipeSchemaType } from "@/validation/recipe-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown, Edit2 } from "lucide-react";
import { useIngredientsStore } from "@/hooks/ingreditents-store";
import { axiosInstance } from "@/api/config";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { categoryType, ingredientsType, recipeType } from "@/types";
import LoadingComponent from "../shared/LoadingComponent";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

type AddRecipeProps = {
  recipe?: recipeType;
  isEdit?: boolean;
};

const AddRecipeModel = ({ isEdit, recipe }: AddRecipeProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ingredientsStore = useIngredientsStore();
  const [loading, setLoading] = useState(true);
  const [ingredientsSelected, setIngredientsSelected] = useState<
    ingredientsType[]
  >([]);
  const [categories, setCategories] = useState<categoryType[]>([]);
  console.log(loading);

  const handelAddIngredients = (ingredient: ingredientsType) => {
    if (!ingredientsSelected.includes(ingredient)) {
      setIngredientsSelected([...ingredientsSelected, ingredient]);
      console.log(ingredientsSelected);
    } else {
      setIngredientsSelected(
        ingredientsSelected.filter((sub) => sub.id !== ingredient.id)
      );
    }
  };

  const recipeForm = useForm<recipeSchemaType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "",
      time: 1,
      category: "",
    },
  });

  const { reset } = recipeForm;

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const getCategory = () => {
    setLoading(true);
    const query = `
  query GetCategories {

  categories {
  name    
  }
}
  `;
    axiosInstance
      .post("/", {
        query,
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.data.categories);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getIngredients = () => {
    setLoading(true);
    const query = `
    query {
      getIngredients {
        id
        name
        recipes {
          id
          title
        }
      }
    }
  `;
    axiosInstance
      .post("/", {
        query,
      })
      .then((res) => {
        console.log(res.data);
        ingredientsStore.setIngredients(res.data.data.getIngredients);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (data: recipeSchemaType) => {
    console.log(data);

    startTransition(() => {
      if (ingredientsSelected.length === 0) {
        toast.error("please select at least one ingredient");
        return;
      }
      if (isEdit) {
        // edit recipe
      } else {
        const query = `mutation Mutation($title: String!, $ingredients: [String!]!, $category: String!, $description: String, $difficulty: String, $time: Int) {
  createRecipe(title: $title, ingredients: $ingredients, category: $category, description: $description, difficulty: $difficulty, time: $time) {
    id
    title
    description
  }
}`;
        axiosInstance
          .post("/", {
            query,
            variables: {
              title: data.title,
              ingredients: ingredientsSelected.map(
                (ingredient) => ingredient.name
              ),
              category: data.category,
              time: data.time,
              difficulty: data.difficulty,
              description: data.difficulty,
            },
          })
          .then((res) => {
            console.log(res.data);
            toast.success(" the recipe has been added successfully ");

            recipeForm.reset();
            closeModal();
          })
          .catch((err) => {
            console.log(err);
            toast.error("  something went wrong try again");
          });
      }
    });
  };

  useEffect(() => {
    getIngredients();
    getCategory();
  }, []);

  useEffect(() => {
    if (recipe) {
      reset({
        title: recipe.title,
        description: recipe.description,
        category: recipe.category.name,
        difficulty: recipe.difficulty,
        time: recipe.time,
      });
    }
  }, [reset, recipe]);

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <Button
        className="text-sm font-semibold text-white "
        onClick={openModal}
        variant={isEdit ? "outline" : "dark-green"}
        size={isEdit ? "icon" : "default"}
      >
        {isEdit ? <Edit2 className="w-5 h-5" color="#000" /> : "Add Recipe"}
      </Button>
      <DialogContent>
        <DialogTitle className="text-left mt-4 text-2xl">
          {isEdit ? `Edit the Recipe ` : "  Add Recipe"}
        </DialogTitle>
        <ScrollArea className="h-[400px] ">
          <Form {...recipeForm}>
            <form
              action=""
              className="direction-rtl md:space-y-8 space-y-2 relative px-4 "
              onSubmit={recipeForm.handleSubmit(onSubmit)}
            >
              <FormField
                control={recipeForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col ">
                    <FormLabel className="lg:text-xl text-base font-medium text-main-black lg:font-semibold">
                      recipe name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="recipe name"
                        type="text"
                        value={field.value}
                        className="disabled:bg-white disabled:text-primary-grey-700 disabled:text-sm disabled:opacity-100 border border-[#E5E9EE] border-solid font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="w-full flex flex-col ">
                <FormLabel className="lg:text-xl text-base font-medium text-main-black lg:font-semibold">
                  ingredients
                </FormLabel>
                {ingredientsSelected.length > 0 ? (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {ingredientsSelected.map((ingredient) => (
                        <div
                          key={ingredient.id}
                          className="flex items-center justify-center bg-primary-green-dark text-white px-2 py-1 rounded-md"
                        >
                          {ingredient.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="capitalize flex items-center justify-center  text-primary-grey-100 text-sm px-2  rounded-md">
                      no ingredient selected
                    </div>
                  </div>
                )}
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between text-primary-grey-100"
                        )}
                      >
                        choose ingredients
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-black" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px]  p-0">
                    <Command>
                      <CommandInput placeholder=" search for the ingredients you need" />
                      <CommandList>
                        <CommandEmpty>
                          there is no ingredients yet
                          <Link to={"/"}>add you own</Link>
                        </CommandEmpty>
                        <ScrollArea className="h-72">
                          <CommandGroup>
                            {ingredientsStore.ingredients.length > 0 ? (
                              ingredientsStore.ingredients.map((ingredient) => (
                                <CommandItem
                                  value={ingredient.name}
                                  key={ingredient.id}
                                  onSelect={() =>
                                    handelAddIngredients(ingredient)
                                  }
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      ingredientsSelected &&
                                        ingredientsSelected.includes(ingredient)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {ingredient.name}
                                </CommandItem>
                              ))
                            ) : (
                              <div className="flex items-center justify-center w-full h-full">
                                <LoadingComponent className="w-10 h-10" />
                              </div>
                            )}
                          </CommandGroup>
                        </ScrollArea>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
              <FormField
                control={recipeForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col ">
                    <FormLabel className="lg:text-xl text-base font-medium text-main-black lg:font-semibold">
                      category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {categories.length >= 1 ? (
                          categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={
                                category.name ? category.name : "no category"
                              }
                            >
                              {category.name ? category.name : "no category"}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <LoadingComponent className="w-10 h-10" />
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={recipeForm.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col ">
                    <FormLabel className="lg:text-xl text-base font-medium text-main-black lg:font-semibold">
                      difficulty
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value={"easy"}>easy</SelectItem>
                        <SelectItem value={"medium"}>medium</SelectItem>
                        <SelectItem value={"hard"}>hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={recipeForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col ">
                    <FormLabel className="lg:text-xl text-base font-medium text-main-black lg:font-semibold">
                      time
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="select the time needed to prepare the recipe"
                        type="number"
                        value={field.value}
                        className="disabled:bg-white disabled:text-primary-grey-700 disabled:text-sm disabled:opacity-100 border border-[#E5E9EE] border-solid font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={recipeForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col ">
                    <FormLabel className="lg:text-xl text-base font-medium text-main-black lg:font-semibold">
                      description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="description"
                        value={field.value}
                        className="disabled:bg-white resize-none h-[200px] disabled:text-primary-grey-700 disabled:text-sm disabled:opacity-100 border border-[#E5E9EE] border-solid font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-start flex-col sm:flex-row gap-2 ">
                <Button
                  type="submit"
                  className="text-sm font-semibold  px-10"
                  variant={"default"}
                  disabled={isPending}
                >
                  Add
                </Button>
                <Button
                  type="button"
                  onClick={closeModal}
                  className="text-sm font-semibold  px-10"
                  variant={"destructive"}
                >
                  cancel
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Modal>
  );
};

export default AddRecipeModel;
