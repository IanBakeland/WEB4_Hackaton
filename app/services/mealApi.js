/**
 * Meal API service functions
 * Centralizes all API calls to TheMealDB API
 */

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Fetch random meal
 * @returns {Promise<Object>} - Random meal object
 */
export const fetchRandomMeal = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/random.php`);
        if (!response.ok) throw new Error("Failed to fetch random meal");
        return await response.json();
    } catch (error) {
        console.error("Error fetching random meal:", error);
        throw error;
    }
};

/**
 * Fetch meal by ID
 * @param {string} id - Meal ID
 * @returns {Promise<Object>} - Meal object
 */
export const fetchMealById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
        if (!response.ok) throw new Error("Failed to fetch meal");
        return await response.json();
    } catch (error) {
        console.error("Error fetching meal:", error);
        throw error;
    }
};

/**
 * Search meals by name
 * @param {string} name - Meal name to search
 * @returns {Promise<Array>} - Array of meal objects
 */
export const searchMealsByName = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=${name}`);
        if (!response.ok) throw new Error("Failed to search meals");
        return await response.json();
    } catch (error) {
        console.error("Error searching meals:", error);
        throw error;
    }
};

/**
 * Fetch meals by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} - Array of meal objects
 */
export const fetchMealsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
        if (!response.ok) throw new Error("Failed to fetch meals by category");
        return await response.json();
    } catch (error) {
        console.error("Error fetching meals by category:", error);
        throw error;
    }
};

/**
 * Fetch all categories
 * @returns {Promise<Array>} - Array of category objects
 */
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories.php`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

/**
 * Fetch multiple random meals
 * @param {number} count - Number of meals to fetch
 * @returns {Promise<Array>} - Array of random meal objects
 */
export const fetchMultipleRandomMeals = async (count = 6) => {
    try {
        const promises = [];
        for (let i = 0; i < count; i++) {
            promises.push(fetchRandomMeal());
        }
        const results = await Promise.all(promises);
        return results
            .map((result) => result.meals?.[0])
            .filter((meal) => meal !== undefined);
    } catch (error) {
        console.error("Error fetching multiple random meals:", error);
        throw error;
    }
};
