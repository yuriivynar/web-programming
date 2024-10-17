const findInput = document.getElementById("find_input");
const searchClearButton = document.getElementById("clear_button");
const countButton = document.getElementById('count_button');
const countClearButton = document.getElementById('count_clear_button');
const sumPriceElement = document.getElementById('sumprice');
const itemsContainer = document.getElementById('items_container');
const sortCheckbox = document.querySelector('#sort_checkbox input');

let gems = [];

const fetchGems = async () => {
    const response = await fetch('/api/gems');
    gems = await response.json();
    renderGems(gems);
};

const renderGems = (gems) => {
    itemsContainer.innerHTML = '';
    gems.forEach(renderGem);
};

const removeGem = async (id) => {
    await fetch(`/api/gems/${id}`, { method: 'DELETE' });
    fetchGems();
};

const editGem = (id) => {
    localStorage.setItem('editGemId', id);
    window.location.href = 'edit_page.html';
}

const fetchFilteredGems = async () => {
    const searchTerm = findInput.value;
    const isDescending = sortCheckbox.checked;
    const response = await fetch(`/api/gems/filter?q=${searchTerm}&desc=${isDescending}&sort=true`);
    const data = await response.json();
    renderGems(data.filteredGems);
};

findInput.addEventListener("input", fetchFilteredGems);

searchClearButton.addEventListener("click", () => {
    findInput.value = "";
    fetchGems();
});

sortCheckbox.addEventListener('change', fetchFilteredGems);

countButton.addEventListener("click", async () => {
    const searchTerm = findInput.value; 
    const isDescending = sortCheckbox.checked;
    const response = await fetch(`/api/gems/filter?q=${searchTerm}&desc=${isDescending}&sort=true`);
    const data = await response.json();
    sumPriceElement.textContent = `$${data.totalSum}`;
});

countClearButton.addEventListener("click", () => {
    sumPriceElement.textContent = `$0`;
});

const renderGem = (gem) => {
    const gemItem = document.createElement('li');
    gemItem.id = gem.id;
    gemItem.classList.add('cards__content');

    gemItem.innerHTML = `
        <img src="/images/types-of-diamonds.png" alt="" class="cards__img">
        <div class="cards__body">
            <h2 class="cards__title">${gem.title}</h2>
            <p class="cards__parag">${gem.description}</p>
            <p class="cards__price">Price: ${gem.expense} $</p>
            <div class="cards__button">
                <button id="edit_button_${gem.id}" class="cards__edit">Edit</button>
                <button id="remove_button_${gem.id}" class="cards__remove">Remove</button>
            </div>
        </div>
    `;
    gemItem.querySelector(`#edit_button_${gem.id}`).addEventListener('click', () => editGem(gem.id));
    gemItem.querySelector(`#remove_button_${gem.id}`).addEventListener('click', () => removeGem(gem.id));
    itemsContainer.appendChild(gemItem);
};

fetchGems();
