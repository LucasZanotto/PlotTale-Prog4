import { Link } from "react-router-dom";

const getStatusStyle = (status) => {
  switch (status) {
    case "ACCEPTED":
      return { color: "green", fontWeight: "bold" };
    case "REJECTED":
      return { color: "red", textDecoration: "line-through" };
    case "PENDING":
    default:
      return { color: "orange" };
  }
};

const ContributionCard = ({ contribution }) => {
  if (!contribution.book) return null;

  return (
    <Link
      to={`/books/${contribution.book.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          cursor: "pointer",
          transition: "box-shadow 0.2s",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)")
        }
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <p>Contribuição para:</p>
        <h3>{contribution.book.title}</h3>
        <p>
          Status:{" "}
          <span style={getStatusStyle(contribution.status)}>
            {contribution.status}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ContributionCard;
