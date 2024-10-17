document.addEventListener('DOMContentLoaded', async () => {
    const editButton = document.getElementById('submit_button');
    const titleInput = document.getElementById('title_input');
    const descriptionInput = document.getElementById('description_input');
    const expenseInput = document.getElementById('daily-expense');
    const editGemId = localStorage.getItem('editGemId');

    if (!editGemId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`/api/gems`);
        const gems = await response.json();
        const gemToEdit = gems.find(gem => gem.id === editGemId);

        if (gemToEdit) {
            titleInput.value = gemToEdit.title;
            descriptionInput.value = gemToEdit.description;
            expenseInput.value = gemToEdit.expense;
        } else {
            window.location.href = 'index.html';
            return;
        }
    } catch (error) {
        console.error('Failed to load gem data:', error);
        alert('Failed to load gem data. Please try again.');
        window.location.href = 'index.html';
        return;
    }

    editButton.addEventListener('click', async (event) => {
        event.preventDefault();
        
        const updatedGem = {
            id: editGemId,
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            expense: parseFloat(expenseInput.value)
        };

        try {
            const response = await fetch(`/api/gems/${editGemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGem),
            });

            if (response.ok) {
                localStorage.removeItem('editGemId');
                window.location.href = 'index.html';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Failed to update gem:', error);
            alert('An error occurred while updating the gem.');
        }
    });
});
