import { Link } from "react-router";
import "./recipe-card.css";

interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory?: string;
    strArea?: string;
    strMealThumb: string;
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
        <div className="recipe-card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-card-image" />
            <div className="recipe-card-content">
                <h3 className="recipe-card-title">{recipe.strMeal}</h3>
                {recipe.strCategory && (
                    <span className="recipe-card-category">{recipe.strCategory}</span>
                )}
                {recipe.strArea && <p className="recipe-card-area">🌍 {recipe.strArea}</p>}
                <div className="recipe-card-actions">
                    <a
                        href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                        target="_blank"
                        rel="noreferrer"
                        className="recipe-view-btn"
                    >
                        View Ingredients
                    </a>
                </div>
            </div>
        </div>
    );
}
