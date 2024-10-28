import Button from "../Button";
function BookListItem({ book, availableQty, logIn, borrow, returnBook }) {
  return (
    <li key={book.id}>
      {book.title}
      {availableQty > 0 && (
        <>
          -{availableQty}/{book.quantity}
          <Button onClick={() => borrow(book.id)} disabled={availableQty === 0}>
            Borrow Book
          </Button>{" "}
        </>
      )}
      {availableQty === 0 && <span>No copies</span>}

      {logIn && (
        <Button onClick={() => returnBook(book.id)}>Return Book</Button>
      )}
    </li>
  );
}

export default BookListItem;
