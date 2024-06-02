import React, { useState, useEffect } from "react";
import axios from "axios";

import "../style.css";

const EditContactModal = ({
  setIsEditContactModalOpen,
  currentContactId,
  fetchContacts,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/contact/${currentContactId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const contact = response.data.contact;
        setName(contact.firstName);
        setSurname(contact.lastName);
        setPhone(contact.phoneNumber);
      } catch (error) {
        setErrorMessage("Failed to fetch contact details.");
      }
    };
    fetchContact();
  }, [currentContactId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("User is not authenticated.");
        return;
      }

      const response = await axios.patch(
        `http://localhost:8080/api/contact/${currentContactId}`,
        { name, surname, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchContacts();
        setIsEditContactModalOpen(false);
      }
    } catch (error) {
      setErrorMessage("Failed to update contact. Please try again.");
    }
  };

  return (
    <div
      className="edit-contact"
      onClick={() => setIsEditContactModalOpen(false)}
    >
      <div
        className="edit-contact__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-contact__header">
          <div className="edit-contact__title">Edit contact</div>
          <div
            className="edit-contact__close"
            onClick={() => setIsEditContactModalOpen(false)}
          >
            X
          </div>
        </div>
        <div className="edit-contact__body">
          <form onSubmit={handleSubmit} className="edit-contact__form">
            <input
              required
              placeholder="Name"
              id="editContactName"
              name="name"
              type="text"
              className="edit-contact__name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              placeholder="Surname"
              id="editContactSurname"
              name="surname"
              type="text"
              className="edit-contact__surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              required
              placeholder="Phone number"
              id="editContactPhone"
              name="phone"
              type="text"
              className="edit-contact__phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-success edit-contact__button"
            >
              Edit
            </button>
          </form>
          {errorMessage && <p id="editErrorMessage">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export { EditContactModal };
