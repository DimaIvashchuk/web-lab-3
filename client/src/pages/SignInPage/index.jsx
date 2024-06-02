import React, { useState } from "react";
import axios from "axios";

const SignInPage = () => {
  const [formData, setFormData] = useState({
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
        "http://localhost:8080/api/auth/login",
        formData
      );
      console.log(response.data.message);
      alert(response.data.message);
      localStorage.setItem("token", response.data.data.token);
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };

  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const token = localStorage.getItem("token");

  return (
    <main className="page">
      <div className="page__signin signin">
        <div className="signin__container container">
          {token && (
            <div className="alert alert-danger" role="alert">
              You are already logged in!
            </div>
          )}
          {!token && (
            <form
              className="main-login__form"
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
              <fieldset>
                <div className="form-group">
                  <label htmlFor="email" className="form-label mt-4">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
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
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                </div>
              </fieldset>
              <div className="buttons">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="reset" className="btn btn-secondary">
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export { SignInPage };
