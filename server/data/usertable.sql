DROP TABLE IF EXISTS library_users;




-- Users Table
CREATE TABLE library_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);




-- Insert into users table (3 users)
INSERT INTO library_users (name) VALUES
('Can'),
('Ladan'),
('Saleh'),
('Ralf'),
('Anastasiia');




 
 SELECT * FROM library_users;
