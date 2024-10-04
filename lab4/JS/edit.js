document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('submit_button')
    const titleInput = document.getElementById('title_input');
    const descriptionInput = document.getElementById('description_input');
    const expenseInput = document.getElementById('daily-expense');
    const editGemId = localStorage.getItem('editGemId');
    if (!editGemId) {
        window.location.href = 'view_page.html';
        return;
    }
    let gems = JSON.parse(localStorage.getItem('gems')) || [];
    const gemToEdit = gems.find(gem => gem.id === editGemId);

    if (gemToEdit) {
        titleInput.value = gemToEdit.title;
        descriptionInput.value = gemToEdit.description;
        expenseInput.value = gemToEdit.expense;
    }
    editButton.addEventListener('click', (event) => {
        event.preventDefault();
        const isTitleDuplicate = gems.some(gem => gem.title === titleInput.value && gem.id !== editGemId);
        if (isTitleDuplicate) {
            alert('Please choose a different title.');
            return;
        }
        gemToEdit.title = titleInput.value;
        gemToEdit.description = descriptionInput.value;
        gemToEdit.expense = parseFloat(expenseInput.value);
        localStorage.setItem('gems', JSON.stringify(gems));
        localStorage.removeItem('editGemId');
        window.location.href = 'view_page.html';
    });
});
