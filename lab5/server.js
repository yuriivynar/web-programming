const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'api')));
app.get('/favicon.ico', (req, res) => res.status(204));

const dataFilePath = path.join(__dirname, 'api', 'gems.json');

const readGemsFromFile = () => {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    }
    return [];
};

const writeGemsToFile = (gems) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(gems, null, 2));
};

app.get('/api/gems', (req, res) => {
    const gems = readGemsFromFile();
    res.json(gems);
});

app.post('/api/gems', (req, res) => {
    const newGem = req.body;
    const gems = readGemsFromFile();

    const existingGem = gems.find(gem => gem.title === newGem.title);
    if (existingGem) {
        return res.status(400).json({ message: 'Gem with this title already exists.' });
    }

    newGem.id = Date.now().toString();
    gems.push(newGem);
    writeGemsToFile(gems);
    res.status(201).json(newGem);
});

app.put('/api/gems/:id', (req, res) => {
    const { id } = req.params;
    const updatedGem = req.body;
    const gems = readGemsFromFile();

    const gemIndex = gems.findIndex(gem => gem.id === id);

    const existingGem = gems.find(gem => gem.title === updatedGem.title && gem.id !== id);
    if (existingGem) {
        return res.status(400).json({ message: 'Gem with this title already exists.' });
    }

    if (gemIndex !== -1) {
        gems[gemIndex] = { ...gems[gemIndex], ...updatedGem };
        writeGemsToFile(gems);
        res.json(updatedGem);
    } else {
        res.status(404).send('Gem not found');
    }
});

app.delete('/api/gems/:id', (req, res) => {
    const { id } = req.params;
    let gems = readGemsFromFile();
    const gemIndex = gems.findIndex(gem => gem.id === id);

    if (gemIndex !== -1) {
        gems.splice(gemIndex, 1);
        writeGemsToFile(gems);
        res.status(204).send();
    } else {
        res.status(404).send('Gem not found');
    }
});

app.get('/api/gems/filter', (req, res) => {
    const searchTerm = req.query.q ? req.query.q.toLowerCase() : null;
    const isDescending = req.query.desc === 'true';
    const gems = readGemsFromFile();

    let filteredGems = gems;
    if (searchTerm) {
        filteredGems = filteredGems.filter(gem => gem.title.toLowerCase().includes(searchTerm));
    }

    if (req.query.sort) {
        filteredGems = filteredGems.sort((a, b) => 
            isDescending ? b.expense - a.expense : a.expense - b.expense
        );
    }

    const totalSum = filteredGems.reduce((sum, gem) => sum + parseFloat(gem.expense), 0);

    res.json({ filteredGems, totalSum });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
