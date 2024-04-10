import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './models/recipe.js'; // Import the connectDB function
import { getRecipes, getRecipeByTitle, insertRecipe, updateRecipe, deleteRecipe } from './db.js'; // Import the database functions

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
app.use(express.static('public')); // Serve static files from the 'public' directory

// Connect to MongoDB
connectDB();

// Define API endpoints

// Get all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await getRecipes();
        res.json(recipes);
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


// Get recipe by title
app.get('/api/recipes/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const recipe = await getRecipeByTitle(title);
        if (recipe) {
            res.json({ success: true, data: recipe });
        } else {
            res.status(404).json({ success: false, error: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error retrieving recipe by title:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Add a new recipe
app.post('/api/recipes', async (req, res) => {
    const recipe = req.body;
    try {
        await insertRecipe(recipe);
        res.json({ success: true, message: 'Recipe added successfully' });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Update a recipe
app.put('/api/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const updatedRecipe = req.body;
    try {
        const recipeReturned = await updateRecipe(id, updatedRecipe);
        if (recipeReturned) {
            res.json({ success: true, data: recipeReturned });
        } else {
            res.status(404).json({ success: false, error: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedRecipe = await deleteRecipe(id);
        if (deletedRecipe) {
            res.json({ success: true, message: 'Recipe deleted successfully' });
        } else {
            res.status(404).json({ success: false, error: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
