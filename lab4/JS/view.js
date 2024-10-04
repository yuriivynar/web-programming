const findInput = document.getElementById("find_input");
const searchClearButton = document.getElementById("clear_button");
const countButton = document.getElementById('count_button');
const countClearButton = document.getElementById('count_clear_button');
const sumPriceElement = document.getElementById('sumprice');
const itemsContainer = document.getElementById('items_container');
const sortCheckbox = document.querySelector('#sort_checkbox input');

let gems = JSON.parse(localStorage.getItem('gems')) || [];

const removeGem = (id) => {
    gems = gems.filter(gem => gem.id !== id);
    localStorage.setItem('gems', JSON.stringify(gems));
    window.location.reload();
};
const editGem = (id) => {
    localStorage.setItem('editGemId', id);
    window.location.href = 'edit_page.html'
};

const sortGemsByPrice = (isDescending = false) => {
    const sortedGems = gems.slice().sort((a, b) => isDescending ? b.expense - a.expense : a.expense - b.expense);
    itemsContainer.innerHTML = '';
    sortedGems.forEach(({ element }) => {
        itemsContainer.appendChild(element);
    });
};

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
    gemItem.querySelector(`#edit_button_${gem.id}`).addEventListener('click', () =>  {
        editGem(gem.id)});
    gemItem.querySelector(`#remove_button_${gem.id}`).addEventListener('click', () => {
        removeGem(gem.id)});
    itemsContainer.appendChild(gemItem);
    gem.element = gemItem;
};

gems.forEach(renderGem);

findInput.addEventListener("input", () => {
    const searchTerm = findInput.value.toLowerCase().replace(/\s+/g, '');
    gems.forEach(({ title, element }) => {
        const normalizedTitle = title.toLowerCase().replace(/\s+/g, '');
        element.style.display = normalizedTitle.includes(searchTerm) ? 'block' : 'none';
    });
});

searchClearButton.addEventListener("click", () => {
    findInput.value = "";
    gems.forEach(({ element }) => {
        element.style.display = 'block';
    });
});

countButton.addEventListener("click", () => {
    const totalSum = gems.reduce((sum, { expense, element }) => {
        if (element.style.display !== 'none') { 
            return sum + parseFloat(expense);
        }
        return sum;
    }, 0);
    sumPriceElement.textContent = `$${totalSum}`;
});

sortCheckbox.addEventListener('change', () => {
    sortGemsByPrice(sortCheckbox.checked);
});

countClearButton.addEventListener("click", () => {
    sumPriceElement.textContent = `$0`;
});
