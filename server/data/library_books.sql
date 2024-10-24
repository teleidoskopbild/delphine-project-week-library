
DROP TABLE IF EXISTS author;

-- Create Author table

CREATE TABLE author (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

 -- Insert data into Author table
INSERT INTO author ( name) VALUES
( 'Astrid L.'),
('Franz K.'),
('J.K. Rowling'),
( 'Frederick P. Brooks Jr'),
( 'Robert C. Martin'),
( 'Scott Chacon'),
('Viktor Mayer-Schönberger
'),
('Robert C. Martin Series');
SELECT * FROM author;