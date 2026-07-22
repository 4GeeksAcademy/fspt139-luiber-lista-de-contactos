import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();

  const handleDelete = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/luiber/contacts/${contact.id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          dispatch({
            type: "delete_contact",
            payload: contact.id
          });
        }
      })
      .catch((error) => console.error("Error al borrar:", error));
  };

  return (
    <div className="list-group-item d-flex align-items-center justify-content-between p-3">
      <div className="d-flex align-items-center">
        <img
          src="https://picsum.photos/200"
          alt="Contact Avatar"
          className="rounded-circle me-4"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <div>
          <h5 className="mb-1">{contact.name}</h5>
          <p className="mb-1 text-muted"><i className="fas me-2">📍</i>{contact.address}</p>
          <p className="mb-1 text-muted"><i className="fas me-2">📞</i>{contact.phone}</p>
          <p className="mb-0 text-muted"><i className="fas me-2">✉️</i>{contact.email}</p>
        </div>
      </div>

      <div>
        <Link
          to={`/edit-contact/${contact.id}`}
          className="btn btn-link text-dark p-1 me-3"
        >
          ✏️
        </Link>

        <button
          className="btn btn-link text-dark p-1"
          onClick={handleDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};