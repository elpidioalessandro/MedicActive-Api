const pool = require('../config/db');

const getIntervalli = async (req, res) => {
  try {
    let query = 'SELECT i.* FROM intervalli i WHERE 1=1';
    const params = [];

    if (req.query.startDate) {
      params.push(req.query.startDate);
      query += ` AND i.data_inizio >= $${params.length}`;
    }
    if (req.query.endDate) {
      params.push(req.query.endDate);
      query += ` AND i.data_fine <= $${params.length}`;
    }
    if (req.query.goal) {
      params.push(req.query.goal);
      query += ` AND i.id IN (SELECT intervallo_id FROM intervallo_obiettivi WHERE obiettivo_id = $${params.length})`;
    }

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIntervalloById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM intervalli WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Intervallo non trovato' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createIntervallo = async (req, res) => {
  try {
    const { data_inizio, data_fine, user_id } = req.body;
    const result = await pool.query(
      'INSERT INTO intervalli (data_inizio, data_fine, user_id) VALUES ($1, $2, $3) RETURNING *',
      [data_inizio, data_fine, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIntervallo = async (req, res) => {
  try {
    const { id } = req.params;
    const { data_inizio, data_fine, user_id } = req.body;
    const result = await pool.query(
      'UPDATE intervalli SET data_inizio=$1, data_fine=$2, user_id=$3 WHERE id=$4 RETURNING *',
      [data_inizio, data_fine, user_id, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Intervallo non trovato' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIntervallo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM intervalli WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Intervallo non trovato' });
    res.status(200).json({ message: 'Intervallo eliminato' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getIntervalli, getIntervalloById, createIntervallo, updateIntervallo, deleteIntervallo };