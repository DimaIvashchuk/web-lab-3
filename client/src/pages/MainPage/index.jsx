import React, { useState, useEffect } from "react";
import axios from "axios";

import { AddContactModal, EditContactModal } from "../../modals";

import "./style.css";

const MainPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [currentContactId, setCurrentContactId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await axios.get(
        "http://localhost:8080/api/user/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContacts(response.data.contacts);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDeleteContact = async (contactId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/contact/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(contacts.filter((contact) => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <main className="page">
      <section className="page__home home">
        {isAddContactModalOpen && (
          <AddContactModal
            setIsAddContactModalOpen={setIsAddContactModalOpen}
            fetchContacts={fetchContacts}
          />
        )}
        {isEditContactModalOpen && (
          <EditContactModal
            setIsEditContactModalOpen={setIsEditContactModalOpen}
            currentContactId={currentContactId}
            fetchContacts={fetchContacts}
          />
        )}
        <div className="home__container container">
          <div className="home__buttons">
            <button
              type="button"
              className="btn btn-default home__button button-add"
              onClick={() => setIsAddContactModalOpen(true)}
            >
              Add contact
            </button>
            <button
              type="button"
              className="btn btn-default home__button button-sort"
              onClick={toggleSortOrder}
              disabled={contacts.length === 0}
            >
              Sort by name
            </button>
          </div>
          {contacts.length === 0 && (
            <div className="no-contacts-title">No contacts yet</div>
          )}
          {contacts.length > 0 && (
            <table className="table table-info table-main">
              <thead className="table__titles">
                <tr>
                  <th data-sort="firstname">Firstname</th>
                  <th>Lastname</th>
                  <th>Phone number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts
                  .slice()
                  .sort((a, b) => {
                    if (sortOrder === "asc") {
                      return a.firstName.localeCompare(b.firstName);
                    } else {
                      return b.firstName.localeCompare(a.firstName);
                    }
                  })
                  .map((contact) => (
                    <tr key={contact._id} className="table__row">
                      <td className="table__row__name">{contact.firstName}</td>
                      <td className="table__row__surname">
                        {contact.lastName}
                      </td>
                      <td className="table__row__number">
                        {contact.phoneNumber}
                      </td>
                      <td className="table__buttons">
                        <button
                          className="btn btn-danger table__button button-delete"
                          onClick={() => handleDeleteContact(contact._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning table__button button-edit"
                          onClick={() => {
                            setCurrentContactId(contact._id);
                            setIsEditContactModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
};

export { MainPage };
