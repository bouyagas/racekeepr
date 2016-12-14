BEGIN;

DROP TABLE IF EXISTS races;

CREATE TABLE races (
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


COPY races (name, race_date, location)
-- UPDATE THIS PATH WITH YOUR OWN!
FROM '/Users/janellerosario/documents/racekeepr/racekeepr/db/races.csv' with (format csv, delimiter ',');

COMMIT;
