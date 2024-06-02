import React from "react";

import "./style.css";

const AboutPage = () => {
  return (
    <main className="page">
      <section className="page__about">
        <div className="about__container container">
          <div className="about__content">
            <h3 className="about__title">Welcome to PhoneBooker!</h3>
            <p>
              PhoneBooker is your go-to platform for managing your phone
              contacts seamlessly. Our mission is to simplify the way you
              organize and access your contacts, making communication effortless
              and efficient. What sets PhoneBooker apart:
            </p>
            <ul>
              <li>
                User-Friendly Interface: Our interface is designed with
                simplicity in mind, ensuring that managing your contacts is a
                breeze.
              </li>
              <li>
                Secure and Private: We prioritize your privacy and security,
                ensuring that your contact information remains safe and
                confidential.
              </li>
              <li>
                Whether you're a busy professional, a social butterfly, or
                simply looking for a better way to manage your contacts,
                PhoneBooker has you covered. даних.
              </li>
            </ul>
            <p>
              Join us today and experience the convenience of effortless contact
              management!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export { AboutPage };
