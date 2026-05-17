const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PANEL_URL = 'https://welwel.tokowelperid.web.id';
const API_KEY = 'ptla_tiR7cEiQgHq2DLHkpEgstQA09kCWItTB06pahL0hpnO';

app.post('/create-panel', async (req, res) => {
  try {
    const { username, ram } = req.body;

    const password = 'cyra' + Math.floor(Math.random() * 9000 + 1000);
    const email = `${username}@gmail.com`;

    const userRes = await axios.post(`${PANEL_URL}/api/application/users`, {
      username,
      email,
      first_name: username,
      last_name: 'store',
      password
    }, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'Application/vnd.pterodactyl.v1+json'
      }
    });

    res.json({
      success: true,
      username,
      password,
      ram,
      domain: PANEL_URL
    });

  } catch (e) {
    console.log(e.response?.data || e.message);
    res.status(500).json({
      success: false,
      error: e.response?.data || e.message
    });
  }
});

app.listen(5000, () => console.log('Backend jalan'));
