import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header, Footer } from "./components";
import {
  MainPage,
  AboutPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from "./pages";

import "./bootstrap.min.css";
import "./style.css";

const App = () => {
  return (
    <div class="wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
