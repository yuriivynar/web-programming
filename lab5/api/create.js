const submitButton = document.getElementById("submit_button");
const form = document.getElementById('add_form');
const titleInput = document.getElementById('title_input');
const descriptionInput = document.getElementById('description_input');
const expenseInput = document.getElementById('daily-expense');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const gem = {
        id: uuid.v1(),
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        expense: parseFloat(expenseInput.value)
    };

    try {
        const gemsResponse = await fetch('/api/gems');
        const gems = await gemsResponse.json();
        const duplicateGem = gems.find(existingGem => existingGem.title.toLowerCase() === gem.title.toLowerCase());

        if (duplicateGem) {
            alert('Error: A gem with this title already exists. Please choose a different title.');
            return;
        }

        const response = await fetch('/api/gems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gem),
        });

        if (response.ok) {
            document.getElementById('add_form').reset();
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        alert('An error occurred while adding the gem.');
    }
});

