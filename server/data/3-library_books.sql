DROP  TABLE IF EXISTS library_books; 

-- Users Table
CREATE TABLE library_books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    fk_author INT REFERENCES library_authors(id)
);

INSERT INTO library_books (title, quantity, fk_author) VALUES
('The Alchemist', 5, 1),
('1984', 7, 2),
('Brave New World', 4, 3),
('To Kill a Mockingbird', 3, 2),
('The Great Gatsby', 6, 2),
('Moby Dick', 8, 1),
('Pride and Prejudice', 5, 2),
('War and Peace', 2, 3),
('Crime and Punishment', 3, 1),
('The Odyssey', 4, 3);

SELECT * FROM library_books;
