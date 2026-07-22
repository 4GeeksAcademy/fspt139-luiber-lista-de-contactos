import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch("https://playground.4geeks.com/contact/agendas/luiber/contacts")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "set_contacts",
          payload: data.contacts
        });
      })
      .catch((error) => console.error("Error al obtener contactos:", error));
  }, []);

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      <div className="list-group">
        {store.contacts && store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        ) : (
          <p className="text-center mt-4">No hay contactos guardados en la agenda.</p>
        )}
      </div>
    </div>
  );
};