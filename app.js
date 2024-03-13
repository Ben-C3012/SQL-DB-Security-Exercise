const express = require('express');
const app = express();
const port = 3000;
const pool = require('./server');

// get all companies
app.get('/companies', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM companies');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get company by id - vulnerable to SQL injection
app.get('/companies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT id, name , industry FROM companies WHERE id = '" + id + "'");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});