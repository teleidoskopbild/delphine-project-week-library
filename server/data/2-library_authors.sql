DROP TABLE IF EXISTS library_authors CASCADE;
 
-- Create Author table
 
CREATE TABLE library_authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
 
-- Insert data into Author table
INSERT INTO library_authors ( name) VALUES
( 'Astrid Lindgren'),
('Franz Kafka'),
('J.K. Rowling'),
( 'Ken Follet'),
( 'Dan Brown'),
( 'Stephen King'),
('Paul Coelho'),
('George Orwell'),
('Günter Grass'),
('Sebastian Fitzek');
SELECT * FROM library_authors;
