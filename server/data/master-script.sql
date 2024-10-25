-- run this script with 
-- psql -U username -d databasename -f ./master-script.sql
-- install brew install postgresql (on mac)

\i './1-library_users.sql'
\i './2-library_authors.sql'
\i './3-library_books.sql'
\i './4-library_borrowed_books.sql'