export type ingredientsType = {
  id: string;
  name: string;
  recipes: recipeIngredientsType[];
};

export type recipeIngredientsType = {
  id: string;
  title: string;
};

export type categoryType = {
  name: string;
  id: string;
};

export type recipeType = {
  id: string;
  description: string;
  title: string;
  difficulty: string;
  time: number;
  ingredients: categoryType[];
  category: categoryType;
};
