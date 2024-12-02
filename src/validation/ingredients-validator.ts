import { z } from "zod";

export const IngredientsSchema = z.object({
  name: z.string().min(3).max(50),
});

export type IngredientsSchemaType = z.infer<typeof IngredientsSchema>;
