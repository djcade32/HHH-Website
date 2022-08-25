import React, { useEffect, useState } from "react";
import Articles from "./components/Articles/Articles";
import Navbar from "./components/Navbar/Navbar";
import Quote from "./components/Quote/Quote";

function App() {
  const [fetchedAOLArticles, setFetchedAOLArticles] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Running UseEffect");
    fetchAOLArticles();
    fetchFioneersArticles();
  }, []);

  async function fetchAOLArticles() {
    console.log("Fetching AOL articles");
    try {
      const response = await fetch("/api/artOfHealthyLivingScrape");
      if (!response.ok) throw Error("Failed to Fetch AOL Articles");
      const articles = await response.json();
      setFetchedAOLArticles(articles);
      setFetchError(null);
    } catch (error) {
      setFetchError(error.message);
    }
  }

  async function fetchFioneersArticles() {
    console.log("Fetching Fioneers articles");
    try {
      const response = await fetch("/api/fioneersScrape");
      if (!response.ok) throw Error("Failed to Fetch Fioneers Articles");
      const articles = await response.json();
      articles.forEach((article) => {
        setFetchedAOLArticles((prevArticles) => [...prevArticles, article]);
      });
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Quote />
      {isLoading && <p>Fetching Articles...</p>}
      {!fetchError && !isLoading && <Articles articles={fetchedAOLArticles} />}
    </div>
  );
}

export default App;
