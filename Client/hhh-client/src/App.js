import React, { useMemo, useState } from "react";
import Articles from "./components/Articles/Articles";
import Navbar from "./components/Navbar/Navbar";
import Quote from "./components/Quote/Quote";

function App() {
  const [fetchedAOLArticles, setFetchedAOLArticles] = useState([]);

  useMemo(() => {
    fetchAOLArticles();
    fetchFioneersArticles();
  }, []);

  function fetchAOLArticles() {
    console.log("Fetching AOL articles");
    fetch("/api/artOfHealthyLivingScrape")
      .then((res) => res.json())
      .then((articles) => setFetchedAOLArticles(articles));
  }

  function fetchFioneersArticles() {
    console.log("Fetching Fioneers articles");
    fetch("/api/fioneersScrape")
      .then((res) => res.json())
      .then((articles) =>
        articles.forEach((article) => {
          setFetchedAOLArticles((prevArticles) => [...prevArticles, article]);
        })
      );
  }

  return (
    <div className="App">
      <Navbar />
      <Quote />
      <Articles articles={fetchedAOLArticles} />
    </div>
  );
}

export default App;
