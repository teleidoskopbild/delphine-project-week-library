function BookListItem({ book, availableQty, logIn, borrow, returnBook }) {
  return (
    <li key={book.id}>
      {book.title} -
      {availableQty > 0 && (
        <>
          {availableQty}/{book.quantity}
          <button onClick={() => borrow(book.id)}>Borrow Book</button>
        </>
      )}
      {logIn && (
        <button onClick={() => returnBook(book.id)}>Return Book</button>
      )}
    </li>
  );
}

export default BookListItem;
