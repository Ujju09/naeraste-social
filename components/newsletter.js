/** @format */

import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Newsletter() {
  const initialState = Object.freeze({
    email: "",
    fullname: "",
  });
  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState("Subscribe");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const payload = JSON.stringify({
    records: [
      {
        fields: {
          Email: formData.email,
          Name: formData.fullname,
        },
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.fullname === "") {
      alert("Please fill out all fields");
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: payload,
      };
      setLoading("Subscribing...");
      fetch(
        `https://api.airtable.com/v0/appL3eEYotbT6ZB0m/Subscribers`,
        requestOptions
      )
        .then((response) => {
          if (response.status === 200) {
            setLoading("Subscribed!");
            setFormData(initialState);
          }
        })
        .catch((error) => {
          setLoading("Something went wrong!");
        });
    }
  };
  return (
    <footer className={styles.footer}>
      {loading === "Subscribed!" ? (
        <h1 className={styles.title}>Great! You&apos;re subscribed.</h1>
      ) : (
        <div
          style={{
            color: "#D05E70",
            display: "flex",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            width: "100vw",
            backgroundColor: "#1B3EA8",
          }}
        >
          <h1 className={styles.title}>Subscribe for updates</h1>
          <p
            style={{
              color: "white",
              fontSize: "1rem",
              padding: "10px",
              textAlign: "center",
            }}
          >
            Your email will provide us a way to reach you with updates. Believe
            us it will get better.
          </p>
          <input
            type="text"
            placeholder="Your name"
            className={styles.input}
            value={formData.fullname}
            name="fullname"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Your email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          <div
            style={{
              display: "flex",
              flex: "1",
            }}
          >
            <button className={styles.button} onClick={handleSubmit}>
              {loading}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
