import React, { useMemo, useState } from "react";
import Articles from "./components/Articles/Articles";
import Navbar from "./components/Navbar/Navbar";
import Quote from "./components/Quote/Quote";

function App() {
  const [fetchedAOLArticles, setFetchedAOLArticles] = useState([]);

  useMemo(() => {
    fetchAOLArticles();
  }, []);

  function fetchAOLArticles() {
    console.log("Fetching articles");
    fetch("/api/artOfHealthyLivingScrape")
      .then((res) => res.json())
      .then((articles) => setFetchedAOLArticles(articles));
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
