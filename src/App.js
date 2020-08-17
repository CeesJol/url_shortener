import React, { useState } from "react";
const node_fetch = require("node-fetch");

export default function App(props) {
  const [URL, setURL] = useState("");

  const shortenURL = async function (long_url) {
    let response = await node_fetch("/.netlify/functions/shortenURL", {
      body: JSON.stringify({ long_url: long_url }),
      method: "POST",
      mode: "no-cors",
    });
    let data = await response.json();
    return data;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (URL !== "") {
      event.preventDefault();
      await shortenURL(URL).then((data) => {
        alert("http://" + window.location.hostname + "/" + data.shorturl);
      });
    } else {
      alert(`Provide a valid URL`);
    }
  };
  return (
    <form style={{ margin: "auto", textAlign: "center" }}>
      <h5>Fauna URL Shortener</h5>
      <label>
        URL to shorten:
        <input
          type="text"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
        />
      </label>
      <input type="button" value="Shorten" onClick={handleSubmit} />
    </form>
  );
}
