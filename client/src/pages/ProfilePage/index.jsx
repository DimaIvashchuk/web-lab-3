import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    contacts: "",
  });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to sign in to get access to profile page!");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchProfileData();
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/sign-in";
  };

  return (
    <main className="page">
      <div className="page__profile profile">
        <div className="profile__container container">
          {!token && (
            <div className="profile__alert alert alert-danger" role="alert">
              You need to sign in to get access to profile page!
            </div>
          )}
          {token && (
            <>
              <table className="profile__table table table-info">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{profileData.login}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{profileData.email}</td>
                  </tr>
                  <tr>
                    <th>Contacts</th>
                    <td>{Object.keys(profileData.contacts).length}</td>
                  </tr>
                </tbody>
              </table>
              <div class="btn btn-danger" onClick={signOut}>
                Sign Out
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export { ProfilePage };
