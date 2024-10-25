DROP  TABLE IF EXISTS library_books CASCADE;
 
-- Users Table
CREATE TABLE library_books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    fk_author INT REFERENCES library_authors(id)
);
 
INSERT INTO library_books (title, quantity, fk_author) VALUES
('Pippi Longstocking', 5, 1),
('The Brothers Lionheart', 3, 1),
('Ronia, the Robber Daughter', 4, 1),
 
('The Metamorphosis', 2, 2),
('The Trial', 3, 2),
('The Castle', 1, 2),
 
('Harry Potter and the Philosopher Stone', 10, 3),
('Harry Potter and the Chamber of Secrets', 7, 3),
('Harry Potter and the Prisoner of Azkaban', 8, 3),
 
('The Pillars of the Earth', 5, 4),
('World Without End', 4, 4),
('A Column of Fire', 3, 4),
 
('The Da Vinci Code', 6, 5),
('Angels and Demons', 4, 5),
('Inferno', 5, 5),
 
('It', 3, 6),
('The Shining', 2, 6),
('Carrie', 4, 6),
 
('The Alchemist', 7, 7),
('Brida', 5, 7),
 
('1984', 6, 8),
('Animal Farm', 4, 8),
 
('The Tin Drum', 3, 9),
('Cat and Mouse', 2, 9),
 
('Therapy', 4, 10),
('The Package', 5, 10);
 
 
SELECT * FROM library_books;