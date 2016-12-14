BEGIN;

DROP TABLE IF EXISTS savedraces;

CREATE TABLE savedraces (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  race_date date NOT NULL,
  location TEXT,
  distance TEXT,
  url TEXT,
  calendar boolean DEFAULT false,
  completed boolean DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP DEFAULT current_timestamp
);

COMMIT;
