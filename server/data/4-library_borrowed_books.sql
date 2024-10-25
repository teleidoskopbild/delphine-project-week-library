
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
(1, 1, '2024-10-05', '2024-10-21'),
(1, 4, '2024-10-21', NULL),
(1, 18, '2024-10-21', NULL),
(2, 3, '2024-10-10', '2024-10-20'),
(2, 19,'2024-10-10', '2024-10-20'),
(2, 23, '2024-10-20', NULL),
(2, 12, '2024-10-20', NULL),
(3, 5, '2024-10-23', NULL),
(3, 6, '2024-10-23', NULL),
(4, 20, '2024-10-25', NULL),
(4, 21, '2024-10-25', NULL),
(5, 24, '2024-10-01', '2024-10-15');

-- Select data from library_borrowed_books
SELECT * FROM library_borrowed_books;