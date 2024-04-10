import dotenv from 'dotenv';
import Recipe from './models/recipe.js';


dotenv.config();

// Load environment variables
const { CONNECTION_URL } = process.env;

// Insert a new recipe
export const insertRecipe = async (recipe) => {
    try {
        const newRecipe = new Recipe(recipe);
        await newRecipe.save();
        return newRecipe;
    } catch (error) {
        console.error('Error adding recipe:', error);
    }
};

// Retrieve all recipes
export const getRecipes = async () => {
    try {
        const retrievedRecipes = await Recipe.find({});
        return retrievedRecipes;
    } catch (error) {
        console.error('Error retrieving recipes:', error);
    }
};

// Retrieve recipe by title
export const getRecipeByTitle = async (title) => {
    try {
        const recipe = await Recipe.findOne({ title: title });
        return recipe;
    } catch (error) {
        console.error('Error retrieving recipe by title:', error);
    }
};

// Update a recipe
export const updateRecipe = async (id, recipe) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new: true });
        return updatedRecipe;
    } catch (error) {
        console.error('Error updating recipe:', error);
    }
};

// Delete a recipe
export const deleteRecipe = async (id) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        return deletedRecipe;
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
};

export default Recipe; // Export the Recipe model
