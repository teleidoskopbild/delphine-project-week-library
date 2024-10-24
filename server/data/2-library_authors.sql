
DROP TABLE IF EXISTS library_authors;

-- Create Author table

CREATE TABLE library_authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

 -- Insert data into Author table
INSERT INTO library_authors ( name) VALUES
( 'Astrid L.'),
('Franz K.'),
('J.K. Rowling'),
( 'Frederick P. Brooks Jr'),
( 'Robert C. Martin'),
( 'Scott Chacon'),
('Viktor Mayer-Schönberger
'),
('Robert C. Martin Series');
SELECT * FROM library_authors;