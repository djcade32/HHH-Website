import React from "react";
import ArticleCard from "./ArticleCard";
import styles from "./Articles.module.css";

export default function Articles(props) {
  return (
    <div className={styles.articlesContainer}>
      {props.articles.map((article) => (
        <ArticleCard key={article.imgUrl} articleInfo={article} />
      ))}
    </div>
  );
}
