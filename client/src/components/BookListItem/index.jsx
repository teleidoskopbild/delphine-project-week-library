import Button from "../Button";
function BookListItem({ book, availableQty, logIn, borrow, returnBook }) {
  return (
    <div>
      <li key={book.id}>
        <div className="thumbnail">
          <img src={`/thumbnails/${book.id}.jpg`} />
        </div>
        {book.title}
        {availableQty > 0 && (
          <>
            -{availableQty}/{book.total_quantity}
            <Button
              onClick={() => borrow(book.id)}
              disabled={availableQty === 0}
            >
              Borrow Book
            </Button>{" "}
          </>
        )}
        {availableQty === 0 && <span>No copies</span>}

        {logIn && (
          <Button onClick={() => returnBook(book.id)}>Return Book</Button>
        )}
      </li>
    </div>
  );
}

export default BookListItem;
