import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import styles from "./Articles.module.css";

export default function Articles(props) {
  const [fetchedArticles, setFetchedArticles] = useState([]);

  useEffect(() => {
    if (props.articles?.length !== 0) {
      console.log("Setting articles");
      console.log("Articles: ", props.articles);
      setFetchedArticles(props.articles);
    }
  }, [props.articles]);
  return (
    <div className={styles.articlesContainer}>
      {fetchedArticles.map((article) => (
        <ArticleCard key={article.imgUrl} articleInfo={article} />
      ))}
    </div>
  );
}
