# 🧘 MeditActive API

## Descrizione
MeditActive API è un'applicazione backend sviluppata in Node.js che espone una serie di API JSON RESTful per supportare l'app di meditazione MeditActive. Permette la gestione degli utenti, la creazione di intervalli temporali con obiettivi associati e il filtraggio degli intervalli per data e obiettivo.

## Tecnologie usate
* Node.js
* Express.js
* PostgreSQL
* pg (node-postgres)
* dotenv
* Sinon + Mocha + Chai (unit testing)

## Prerequisiti
* Node.js v18+
* PostgreSQL 14+

## Installazione e avvio
1. Clona la repository: `git clone https://github.com/elpidioalessandro/MedicActive-Api.git`
2. Entra nella cartella del progetto: `cd MedicActive-Api`
3. Installa le dipendenze: `npm install`
4. Crea il file `.env` nella root a partire da `.env.example`: `cp .env.example .env`
5. Compila il file `.env` con le tue credenziali PostgreSQL
6. Crea il database: `psql -U postgres -c "CREATE DATABASE meditactive;"`
7. Esegui le migrations: `psql -U postgres -d meditactive -f migrations.sql`
8. Avvia il server: `npm run dev`
9. Il server è disponibile su: http://localhost:3000

## Variabili d'ambiente
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=meditactive
DB_USER=postgres
DB_PASSWORD=la_tua_password
```

## Endpoint

### Utenti
| Metodo | Route | Descrizione |
|--------|-------|-------------|
| GET | /users | Lista tutti gli utenti |
| GET | /users/:id | Singolo utente |
| POST | /users | Crea utente |
| PUT | /users/:id | Modifica utente |
| DELETE | /users/:id | Elimina utente |

### Intervalli
| Metodo | Route | Descrizione |
|--------|-------|-------------|
| GET | /intervals | Lista intervalli (filtrabile) |
| GET | /intervals/:id | Singolo intervallo |
| POST | /intervals | Crea intervallo |
| PUT | /intervals/:id | Modifica intervallo |
| DELETE | /intervals/:id | Elimina intervallo |

### Obiettivi
| Metodo | Route | Descrizione |
|--------|-------|-------------|
| GET | /intervals/:id/goals | Obiettivi di un intervallo |
| POST | /intervals/:id/goals | Associa obiettivo a intervallo |

### Filtri disponibili su GET /intervals
```
/intervals?startDate=2026-01-01
/intervals?endDate=2026-01-31
/intervals?goal=1
```

## Test
```bash
npm test
```
4 unit test sul controller User con Sinon + Mocha + Chai.

## Note
* Tutte le query sono parametrizzate con prepared statement per prevenire SQL injection
* Il file `.env` non è incluso nella repository per motivi di sicurezza




