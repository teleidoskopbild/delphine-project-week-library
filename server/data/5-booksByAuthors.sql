SELECT 
    library_authors.id AS authorId,
    library_authors.name AS authorName,
    library_books.title AS bookTitle
FROM 
    library_authors 
LEFT JOIN 
    library_books 
ON 
    library_authors.id = library_books.fk_author
ORDER BY 
    library_authors.name;
;