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
 * Fetch all countries
 * @returns {Promise<Array>} - Array of country/area objects
 */
export const fetchAllCountries = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/list.php?a=list`);
        if (!response.ok) throw new Error("Failed to fetch countries");
        return await response.json();
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw error;
    }
};

/**
 * Fetch multiple random meals
 * @param {number} count 
 * @returns {Promise<Array>} 
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
