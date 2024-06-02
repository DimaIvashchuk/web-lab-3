import React, { useState } from "react";
import axios from "axios";

import "../style.css";

const AddContactModal = ({ setIsAddContactModalOpen, fetchContacts }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("User is not authenticated.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/contact",
        { name, surname, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchContacts();
        setIsAddContactModalOpen(false);
      }
    } catch (error) {
      setErrorMessage("Failed to add contact. Please try again.");
    }
  };

  return (
    <div
      className="add-contact"
      onClick={() => setIsAddContactModalOpen(false)}
    >
      <div
        className="add-contact__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-contact__header">
          <div className="add-contact__title">Add contact</div>
          <div
            className="add-contact__close"
            onClick={() => setIsAddContactModalOpen(false)}
          >
            X
          </div>
        </div>
        <div className="add-contact__body">
          <form onSubmit={handleSubmit} className="add-contact__form">
            <input
              required
              placeholder="Name"
              name="name"
              type="text"
              className="add-contact__name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              placeholder="Surname"
              name="surname"
              type="text"
              className="add-contact__surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              required
              placeholder="Phone number"
              name="phone"
              type="text"
              className="add-contact__phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-success add-contact__button"
            >
              Add
            </button>
          </form>
          {errorMessage && <p id="addErrorMessage">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export { AddContactModal };
