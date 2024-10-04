const searchInput = document.getElementById('find_input');
const clearButton = document.getElementById('clear_button');
const countButton = document.getElementById('count_button');
const countClearButton = document.getElementById('count_clear_button');
const sumPriceElement = document.getElementById('sumprice');
const itemsContainer = document.getElementById('items_container');
const sortCheckbox = document.querySelector('#sort_checkbox input');


const gems = Array.from(itemsContainer.querySelectorAll('.cards__content')).map(card => {
    const title = card.querySelector('.cards__title').textContent;
    const description = card.querySelector('.cards__parag').textContent;
    const price = parseInt(card.querySelector('.cards__price').textContent.replace(/[^0-9]/g, ''));
    return { title, description, price, element: card };
});
const sortGemsByPrice = (isDescending = false) => {
    if (!isDescending) {
        itemsContainer.innerHTML = '';
        gems.forEach(({ element }) => {
            itemsContainer.appendChild(element);
        });
    } else {
        const sortedGems = gems.slice().sort((a, b) => b.price - a.price);
        itemsContainer.innerHTML = '';
        sortedGems.forEach(({ element }) => {
            itemsContainer.appendChild(element);
        });
    }
};

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().replace(/\s+/g, '');
    
    const filteredGems = gems.filter(({ title }) => {
        const normalizedTitle = title.toLowerCase().replace(/\s+/g, '');
        return normalizedTitle.includes(searchTerm);
    });
    gems.forEach(({ element }) => {
        element.style.display = 'none';
    });
    filteredGems.forEach(({ element }) => {
        element.style.display = 'block';
    });
});
clearButton.addEventListener("click", () => {
    searchInput.value = "";
    gems.forEach(({ element }) => {
        element.style.display = 'block';
    });
});
countButton.addEventListener("click", () => {
    const totalSum = gems.reduce((sum, { price, element }) => {
        if (element.style.display !== 'none') { 
            return sum + price;
        }
        return sum;
    }, 0);
    sumPriceElement.textContent = `$${totalSum}`;
});
countClearButton.addEventListener("click", () => {
    sumPriceElement.textContent = `$0`;
})
sortCheckbox.addEventListener('change', () => {
    sortGemsByPrice(sortCheckbox.checked);
});
