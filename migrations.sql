CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS obiettivi (
  id SERIAL PRIMARY KEY,
  titolo VARCHAR(255) NOT NULL,
  descrizione TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS intervalli (
  id SERIAL PRIMARY KEY,
  data_inizio DATE NOT NULL,
  data_fine DATE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS intervallo_obiettivi (
  intervallo_id INTEGER REFERENCES intervalli(id) ON DELETE CASCADE,
  obiettivo_id INTEGER REFERENCES obiettivi(id) ON DELETE CASCADE,
  PRIMARY KEY (intervallo_id, obiettivo_id)
);