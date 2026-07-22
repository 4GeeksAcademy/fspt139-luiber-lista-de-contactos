import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { store } = useGlobalReducer();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (id && store.contacts.length > 0) {
      const contactToEdit = store.contacts.find((c) => c.id === parseInt(id));
      if (contactToEdit) {
        setName(contactToEdit.name);
        setEmail(contactToEdit.email);
        setPhone(contactToEdit.phone);
        setAddress(contactToEdit.address);
      }
    }
  }, [id, store.contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = { name, email, phone, address };

    const url = id
      ? `https://playground.4geeks.com/contact/agendas/luiber/contacts/${id}`
      : "https://playground.4geeks.com/contact/agendas/luiber/contacts";

    const method = id ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          alert("Error al guardar el contacto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h1 className="text-center mb-4">{id ? "Edit contact" : "Add a new contact"}</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          save
        </button>
      </form>

      <Link to="/">or get back to contacts</Link>
    </div>
  );
};