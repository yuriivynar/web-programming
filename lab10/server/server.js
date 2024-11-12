const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const data = require('./Gems.json')

app.use(express.json());

app.get('/api/data', (req, res) => {
    const { searchTerm = '', sortName = '', sortColor = '', sortPrice = 'none' } = req.query;

    let filteredData = data.filter((item) => {
        const title = item.title.toLowerCase().trim().replace(/\s+/g, '');
        const itemColor = item.color.toLowerCase().trim().replace(/\s+/g, '');
        const searchCondition = title.includes(searchTerm.toLowerCase()) || itemColor.includes(searchTerm.toLowerCase());
        const nameCondition = sortName === '' || item.title === sortName;
        const colorCondition = sortColor === '' || item.color === sortColor;
        return searchCondition && nameCondition && colorCondition;
    });

    if (sortPrice === 'Asceding') {
        filteredData.sort((a, b) => a.price - b.price);
    } else if (sortPrice === 'Descending') {
        filteredData.sort((a, b) => b.price - a.price);
    }

    res.json(filteredData);
});

app.get('/api/data/:id', (req, res) => {
    const {id} = req.params;
    const card = data.find((el) => el.id === parseInt(id));
    if(card) {
        res.json(card);
    } else {
        res.status(404).json({ message: "Card not found" });
    }
});

app.listen(5000,() => {console.log(`Server is running on http://localhost:5000`)})