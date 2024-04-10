document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/recipes')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var tableBody = document.querySelector('#recipeTable tbody');
            data.forEach(recipe => {
                var row = `
                    <tr>
                        <td>${recipe.title}</td>
                        <td>${recipe.ingredients.join(', ')}</td>
                        <td>${recipe.instructions}</td>
                        <td>${recipe.cookingTime} minutes</td>
                        <td>
                            <button onclick="editRecipe('${recipe._id}')">Edit</button>
                            <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        });
});

function editRecipe(id) {
    // Fetch the recipe data using its ID
    fetch(`/api/recipes/${id}`)
        .then(response => response.json())
        .then(data => {
            // Populate the form fields with the recipe data
            document.getElementById('title').value = data.title;
            document.getElementById('ingredients').value = data.ingredients.join('\n');
            document.getElementById('instructions').value = data.instructions;
            document.getElementById('cookingTime').value = data.cookingTime;

            // Change the form action to the update endpoint
            document.getElementById('addRecipeForm').action = `/api/recipes/${id}`;

            // Change the button text to indicate editing mode
            document.querySelector('button[type="submit"]').innerText = 'Update Recipe';
        })
        .catch(error => console.error('Error fetching recipe:', error));
}

function deleteRecipe(id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this recipe?')) {
        // Send a DELETE request to the delete endpoint
        fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Reload the page to reflect the changes
                location.reload();
            } else {
                console.error('Failed to delete recipe');
            }
        })
        .catch(error => console.error('Error deleting recipe:', error));
    }
}
