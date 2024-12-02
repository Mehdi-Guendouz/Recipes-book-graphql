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
import { Edit2 } from "lucide-react";
import { Input } from "../ui/input";
import {
  IngredientsSchema,
  IngredientsSchemaType,
} from "@/validation/ingredients-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ingredientsType } from "@/types";
import { axiosInstance } from "@/api/config";
import { toast } from "sonner";
import { useIngredientsStore } from "@/hooks/ingreditents-store";

type AddCategoryModalProps = {
  ingredient?: ingredientsType;
  isEdit?: boolean;
};

const AddIngredientModal = ({ ingredient, isEdit }: AddCategoryModalProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ingredientsStore = useIngredientsStore();

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const IngredientsForm = useForm<IngredientsSchemaType>({
    resolver: zodResolver(IngredientsSchema),
    defaultValues: {
      name: "",
    },
  });

  const { reset } = IngredientsForm;

  const onSubmit = (data: IngredientsSchemaType) => {
    console.log(data);
    startTransition(() => {
      if (ingredient?.id) {
        axiosInstance
          .post("/")
          .then((res) => {
            console.log(res.data);
            toast.success(" the ingredient has been added ");
            IngredientsForm.reset();
            closeModal();
          })
          .catch((err) => {
            console.log(err);
            toast.error("  something went wrong try again");
          });
      } else {
        const query = `
    mutation createIngredient($name: String!) {
      createIngredient(name: $name) {
        id
        name
      }
    }
  `;
        axiosInstance
          .post("/", {
            query,
            variables: { name: data.name },
          })
          .then((res) => {
            console.log(res.data);
            toast.success(" the ingredient has been added ");
            ingredientsStore.addIngredient({
              ...res.data.data.createIngredient,
              recipes: [],
            });
            IngredientsForm.reset();
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
    if (ingredient) {
      reset({
        name: ingredient.name,
      });
    }
  }, [ingredient, reset]);

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <Button
        className="text-sm font-semibold text-white "
        onClick={openModal}
        variant={isEdit ? "ghost" : "dark-green"}
        size={isEdit ? "icon" : "default"}
      >
        {isEdit ? <Edit2 className="w-5 h-5" /> : "Add Ingredient"}
      </Button>
      <DialogContent>
        <DialogTitle className="text-left mt-4 text-2xl">
          {isEdit ? "  Edit the ingredient" : "  Add Ingredient"}
        </DialogTitle>
        <Form {...IngredientsForm}>
          <form
            action=""
            className="direction-rtl md:space-y-8 space-y-2 relative"
            onSubmit={IngredientsForm.handleSubmit(onSubmit)}
          >
            <FormField
              control={IngredientsForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col ">
                  <FormLabel className="lg:text-xl text-base font-medium text-main-black lg:font-semibold">
                    Ingredient name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ex: tomato"
                      type="text"
                      value={field.value}
                      className="disabled:bg-white disabled:text-primary-grey-700 disabled:text-sm disabled:opacity-100 border border-[#E5E9EE] border-solid font-medium"
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
      </DialogContent>
    </Modal>
  );
};

export default AddIngredientModal;
