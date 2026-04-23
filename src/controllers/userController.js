const pool = require('../config/db');

const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Utente non trovato' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, nome, cognome } = req.body;
    const result = await pool.query(
      'INSERT INTO users (email, nome, cognome) VALUES ($1, $2, $3) RETURNING *',
      [email, nome, cognome]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, nome, cognome } = req.body;
    const result = await pool.query(
      'UPDATE users SET email=$1, nome=$2, cognome=$3 WHERE id=$4 RETURNING *',
      [email, nome, cognome, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Utente non trovato' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Utente non trovato' });
    res.status(200).json({ message: 'Utente eliminato' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };