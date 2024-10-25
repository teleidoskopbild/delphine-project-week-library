SELECT 
    b.title,
    b.quantity AS total_quantity,
    COALESCE(b.quantity - COUNT(bb.id), b.quantity) AS available_quantity
FROM 
    library_books b
LEFT JOIN 
    library_borrowed_books bb ON b.id = bb.fk_book_id AND bb.returned_at IS NULL
GROUP BY 
    b.id;
