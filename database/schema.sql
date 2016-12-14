BEGIN;

DROP TABLE IF EXISTS races;
DROP TABLE IF EXISTS calendar;
DROP TABLE IF EXISTS completed;
DROP TABLE IF EXISTS user_profile;

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

CREATE TABLE calendar (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  race_date date NOT NULL,
  location TEXT,
  distance TEXT,
  url TEXT,
  calendar boolean DEFAULT false,
  completed boolean DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP DEFAULT current_timestamp,
  user_id INT,
  pending boolean DEFAULT false
);


CREATE TABLE user_profile (
  id VARCHAR(50) PRIMARY KEY,
  session_id TEXT,
  profile_img VARCHAR(100)
);

COPY races (name, race_date, location)
-- UPDATE THIS PATH WITH YOUR OWN!
FROM '/Users/janellerosario/documents/racekeepr/racekeepr/db/races.csv' with (format csv, delimiter ',');

COMMIT;
