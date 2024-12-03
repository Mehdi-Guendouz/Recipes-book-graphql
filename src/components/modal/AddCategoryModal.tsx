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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categoryType } from "@/types";
import { axiosInstance } from "@/api/config";
import { toast } from "sonner";
import {
  IngredientsSchema,
  IngredientsSchemaType,
} from "@/validation/ingredients-validator";
import { useCategoryStore } from "@/hooks/category-store";

type AddCategoryModalProps = {
  category?: categoryType;
  isEdit?: boolean;
};

const AddCategoryModal = ({ category, isEdit }: AddCategoryModalProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const categorysStore = useCategoryStore();

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const categorysForm = useForm<IngredientsSchemaType>({
    resolver: zodResolver(IngredientsSchema),
    defaultValues: {
      name: "",
    },
  });

  const { reset } = categorysForm;

  const onSubmit = (data: IngredientsSchemaType) => {
    console.log(data);
    startTransition(() => {
      if (category?.id) {
        const query = `
    mutation UpdateCategory($updateCategoryId: ID!, $name: String!) {
  updateCategory(id: $updateCategoryId, name: $name) {
    id, 
    name
  }
}
    `;
        axiosInstance
          .post("/", {
            query,
            variables: { updateCategoryId: category.id, name: data.name },
          })
          .then((res) => {
            console.log(res.data);
            toast.success(" the category has been updated successfully ");
            categorysStore.updateCategory(res.data.data.updateCategory);
            categorysForm.reset();
            closeModal();
          })
          .catch((err) => {
            console.log(err);
            toast.error("  something went wrong try again");
          });
      } else {
        const query = `
    mutation createCategory($name: String!) {
      createCategory(name: $name) {
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
            toast.success(" the category has been added successfully ");
            categorysStore.addCategory(res.data.data.createCategory);
            categorysForm.reset();
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
    if (category) {
      reset({
        name: category.name,
      });
    }
  }, [category, reset]);

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <Button
        className="text-sm font-semibold text-white "
        onClick={openModal}
        variant={isEdit ? "outline" : "dark-green"}
        size={isEdit ? "icon" : "default"}
      >
        {isEdit ? <Edit2 className="w-5 h-5" color="#000" /> : "Add category"}
      </Button>
      <DialogContent>
        <DialogTitle className="text-left mt-4 text-2xl">
          {isEdit ? `Edit the category ${category?.id}` : "  Add category"}
        </DialogTitle>
        <Form {...categorysForm}>
          <form
            action=""
            className="direction-rtl md:space-y-8 space-y-2 relative"
            onSubmit={categorysForm.handleSubmit(onSubmit)}
          >
            <FormField
              control={categorysForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col ">
                  <FormLabel className="lg:text-xl text-base font-medium text-main-black lg:font-semibold">
                    category name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ex: dessert"
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

export default AddCategoryModal;
