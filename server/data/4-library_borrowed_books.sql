
-- Create library_Borrowed_Books table 
DROP TABLE IF EXISTS library_borrowed_books;
CREATE TABLE library_borrowed_books (
    id SERIAL PRIMARY KEY,
    fk_user_id INT REFERENCES library_users(id),  -- Changed to INT to match the data type of library_users.id

    fk_book_id INT REFERENCES library_books(id),  -- Changed to INT to match the data type of library_books.id

    borrowed_at DATE NOT NULL,
    returned_at DATE
    --(fk_user_id) INT REFERENCES library_users(id),
    --(fk_book_id) INT REFERENCES library_books(id)
    
);

-- Insert data into library_borrowed_books
INSERT INTO library_borrowed_books (fk_user_id, fk_book_id, borrowed_at, returned_at) VALUES
(1, 1, '2020-01-01', NULL),
(1, 2, '2020-01-01', NULL),
(2, 3, '2020-01-03', '2020-01-13');

-- Select data from library_borrowed_books
SELECT * FROM library_borrowed_books;