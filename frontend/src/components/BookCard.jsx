import { Link } from "react-router-dom";
import "./BookCard.css";

const BookCard = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} className="book-card-link">
      <div className="book-card">
        <h3>{book.title}</h3>
        {book.author && (
          <p className="book-card-author">por {book.author.name}</p>
        )}
        {book.genre && <span className="book-card-genre">{book.genre}</span>}
      </div>
    </Link>
  );
};

export default BookCard;
