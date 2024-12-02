const bcrypt = require('bcrypt');
const User = require('../my-app/src/models/User.js');
const Cart = require('../my-app/src/models/Cart.js');
const initDb = require('../my-app/src/initDb.js');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const data = require('./Gems.json')

app.use(express.json());

initDb();

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

app.patch('/api/clear-cart', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const user = await User.findOne({ where: { email: token } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const cart = await Cart.findOne({ where: { user_id: user.id } });
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      cart.items = [];
      await cart.save();
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      await Cart.create({ user_id: user.id, items: [] });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    let cart = await Cart.findOne({ where: { user_id: user.id } });
    if (!cart) {
      await Cart.create({ user_id: user.id, items: [] });
    }
    res.status(200).json({ token: email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/user', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const user = await User.findOne({ where: { email: token } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/user-info', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const user = await User.findOne({ where: { email: token } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/cart', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { items } = req.body;
  try {
    const user = await User.findOne({ where: { email: token } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    let cart = await Cart.findOne({ where: { user_id: user.id } });
    if (cart) {
      cart.items = items.length ? items : [];
      await cart.save();
    } else {
      cart = await Cart.create({ user_id: user.id, items: items.length ? items : [] });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/cart', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const user = await User.findOne({ where: { email: token } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const cart = await Cart.findOne({ where: { user_id: user.id } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/cart', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const user = await User.findOne({ where: { email: token } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const cart = await Cart.findOne({ where: { user_id: user.id } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    await cart.destroy();
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/cart/remove-item', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { itemId, itemColor } = req.body;
  try {
    const user = await User.findOne({ where: { email: token } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const cart = await Cart.findOne({ where: { user_id: user.id } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    cart.items = cart.items.filter(item => !(item.id === itemId && item.color === itemColor));
    await cart.save();
    res.status(200).json({ message: 'Item removed successfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000,() => {console.log(`Server is running on http://localhost:5000`)})