import Button from "../Button";
function BookListItem({ book, availableQty, logIn, borrow, returnBook }) {
  return (
    <li key={book.id}>
      <div className="thumbnail">
        <img src={`/thumbnails/${book.id}.jpg`} />
      </div>
      <div className="book-title">{book.title}</div>
      {book.authorName && <div>By {book.authorName}</div>}
      <div>
        {availableQty > 0 ? (
          <>
            <div>
              Available: {availableQty} {availableQty === 1 ? "book" : "books"}
            </div>
            <Button
              onClick={() => borrow(book.id)}
              disabled={availableQty === 0}
            >
              Borrow Book
            </Button>
          </>
        ) : (
          <div>No books available</div> // Diese Nachricht erscheint nur, wenn availableQty gleich 0 ist
        )}
      </div>

      {availableQty === 0 && (
        <Button style={{ backgroundColor: "red" }}>Out of Stock</Button>
      )}

      {logIn && (
        <Button onClick={() => returnBook(book.id)}>Return Book</Button>
      )}
    </li>
  );
}

export default BookListItem;
