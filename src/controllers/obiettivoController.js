const pool = require('../config/db');

const getObiettiviByIntervallo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT o.* FROM obiettivi o
       JOIN intervallo_obiettivi io ON o.id = io.obiettivo_id
       WHERE io.intervallo_id = $1`,
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const associaObiettivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { titolo, descrizione } = req.body;

    const obiettivo = await pool.query(
      'INSERT INTO obiettivi (titolo, descrizione) VALUES ($1, $2) RETURNING *',
      [titolo, descrizione]
    );

    await pool.query(
      'INSERT INTO intervallo_obiettivi (intervallo_id, obiettivo_id) VALUES ($1, $2)',
      [id, obiettivo.rows[0].id]
    );

    res.status(201).json(obiettivo.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getObiettiviByIntervallo, associaObiettivo };