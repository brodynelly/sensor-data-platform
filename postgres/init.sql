CREATE TABLE pigs (
    pig_id INT PRIMARY KEY,
    breed VARCHAR(50),
    in_heat BOOLEAN,
    breeding_time TIMESTAMP,
    pregnant_check BOOLEAN,
    farrowing_time TIMESTAMP
);

CREATE TABLE posture_data (
    posture_id SERIAL PRIMARY KEY,
    pig_id INT REFERENCES pigs(pig_id) ON DELETE CASCADE,
    posture INT,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE vulva_swelling (
    record_id SERIAL PRIMARY KEY,
    pig_id INT REFERENCES pigs(pig_id) ON DELETE CASCADE,
    swelling_level INT,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE breath_rate (
    record_id SERIAL PRIMARY KEY,
    pig_id INT REFERENCES pigs(pig_id) ON DELETE CASCADE,
    breaths_per_minute INT,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE bcs_data (
    record_id SERIAL PRIMARY KEY,
    pig_id INT REFERENCES pigs(pig_id) ON DELETE CASCADE,
    bcs_score FLOAT,
    timestamp TIMESTAMP NOT NULL
);
