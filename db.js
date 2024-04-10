import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Load environment variables
const { CONNECTION_URL } = process.env;

// Connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// Define schema for recipes
const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String,
    cookingTime: String
}, { collection: 'recipes' }); // Specify the collection name

// Create a model based on the schema
export const Recipe = mongoose.model('Recipe', recipeSchema);

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
