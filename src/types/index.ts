export type ingredientsType = {
  id: string;
  name: string;
  recipes: recipeIngredientsType[];
};

export type recipeIngredientsType = {
  id: string;
  title: string;
};
