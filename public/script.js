document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/recipes')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let tableBody = document.querySelector('#recipeTable tbody');
            data.forEach(recipe => {
                let row = `
                    <tr data-id="${recipe._id}">
                        <td>${recipe.title}</td>
                        <td>${recipe.ingredients.join(', ')}</td>
                        <td>${recipe.instructions}</td>
                        <td>${recipe.cookingTime} </td>
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
    // Find the table row corresponding to the recipe ID
    let row = document.querySelector(`#recipeTable tbody tr[data-id="${id}"]`);

    // Get the table cells within the row
    let cells = row.querySelectorAll('td');

    // Loop through the cells to make them editable
    cells.forEach(cell => {
        // Create an input element
        let input = document.createElement('textarea');
        input.value = cell.textContent.trim(); // Set input value to current cell content
        cell.textContent = ''; // Clear the cell content
        cell.appendChild(input); // Append the input element to the cell
    });

    // Create a Save button
    let saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.setAttribute('onclick', `saveRecipe('${id}')`);
    row.querySelector('td:last-child').appendChild(saveButton); // Append the Save button to the last cell

    // Create a Cancel button
    let cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.setAttribute('onclick', `cancelEdit('${id}')`);
    row.querySelector('td:last-child').appendChild(cancelButton); // Append the Cancel button to the last cell

    // Hide the Edit button
    let editButton = row.querySelector('button:nth-last-child(3)');
    editButton.style.display = 'none';
}

function cancelEdit(id) {
    // Reload the page to cancel the edit and revert changes
    location.reload();
}

function saveRecipe(id) {
    // Retrieve the table row corresponding to the recipe ID
    let row = document.querySelector(`#recipeTable tbody tr[data-id="${id}"]`);

    // Retrieve the input values from the row
    let inputs = row.querySelectorAll('textarea'); // Change 'input' to 'textarea'
    let updatedRecipe = {
        title: inputs[0].value,
        ingredients: inputs[1].value.split(',').map(ingredient => ingredient.trim()),
        instructions: inputs[2].value,
        cookingTime: inputs[3].value
    };

    // Send a PUT request to update the recipe
    fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecipe)
    })
    .then(response => {
        if (response.ok) {
            // Reload the page to reflect the changes
            location.reload();
        } else {
            console.error('Failed to update recipe');
        }
    })
    .catch(error => console.error('Error updating recipe:', error));
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

// Function to add a new recipe
function addRecipe() {
    // Get form data
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value.split('\n');
    const instructions = document.getElementById('instructions').value;
    const cookingTime = document.getElementById('cookingTime').value;

    // Create recipe object
    const newRecipe = {
        title: title,
        ingredients: ingredients,
        instructions: instructions,
        cookingTime: cookingTime
    };

    // Send POST request to add new recipe
    fetch('/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
    })
    .then(response => {
        if (response.ok) {
            // Refresh table to display newly added recipe
            // fetchRecipes(); 
            // Clear form fields
            document.getElementById('addRecipeForm').reset();
        } else {
            console.error('Failed to add recipe');
        }
    })
    .catch(error => console.error('Error adding recipe:', error));
}

// Event listener for form submission
document.getElementById('addRecipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    addRecipe(); // Call addRecipe function
    location.reload();
});
