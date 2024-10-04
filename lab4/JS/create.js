const submitButton = document.getElementById("submit_button");
const form = document.getElementById('add_form');
const titleInput = document.getElementById('title_input');
const descriptionInput = document.getElementById('description_input');
const expenseInput = document.getElementById('daily-expense');


submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const gem = {
        id: uuid.v1(), 
        title: titleInput.value,
        description: descriptionInput.value,
        expense: expenseInput.value
    };
    const gems = JSON.parse(localStorage.getItem('gems')) || [];
    const isTitleDuplicate = gems.some(existingGem => existingGem.title === gem.title);
    if (isTitleDuplicate) {
        alert('Please choose a different title.');
    } else {
        gems.push(gem);
        localStorage.setItem('gems', JSON.stringify(gems));
        document.getElementById('add_form').reset();
        window.location.href = 'view_page.html'
    }})
