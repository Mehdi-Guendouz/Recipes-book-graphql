import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(500),
  difficulty: z.string().min(3).max(50),
  time: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ),
  category: z.string().min(3).max(50),
});

export type recipeSchemaType = z.infer<typeof recipeSchema>;
