import { useEffect, useState } from "react";
import { RecipeCard } from "../components/RecipeCard";
import { fetchMultipleRandomMeals } from "../services/mealApi.js";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strMealThumb: string;
}

export function Welcome() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const meals = await fetchMultipleRandomMeals(6);
        setRecipes(meals);
      } catch (error) {
        console.error("Failed to load recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-100 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Recipes Section */}
        <div className="mb-12">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-700 mt-4">
                Recepten laden...
              </p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-700">
                Geen recepten gevonden
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
