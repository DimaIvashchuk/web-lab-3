import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );
      alert(response.data.message);
      window.location.href = "/sign-in";
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <main className="page">
      <section className="page__signup signup">
        <div className="signup__container container">
          {token && (
            <div className="alert alert-danger" role="alert">
              You are already logged in!
            </div>
          )}
          {!token && (
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="form-group">
                  <label htmlFor="name" className="form-label mt-4">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="login"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label mt-4">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label mt-4">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create your password"
                    autoComplete="off"
                  />
                </div>
                <button type="submit" className="btn btn-primary signup-btn">
                  Sign up
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export { SignUpPage };
