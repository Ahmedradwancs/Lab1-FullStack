import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Load environment variables
const { PORT, CONNECTION_URL } = process.env;

// MongoDB Connection URI
const uri = CONNECTION_URL;

// Connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
