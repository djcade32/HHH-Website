import React from "react";
import styles from "./Quote.module.css";

export default function Quote() {
  return (
    <div className={styles.quoteContainer}>
      <p className={styles.quoteTitle}>Quote of the Day</p>
      <p className={styles.quote}>
        The reason most people fail is because they give up what they want most
        for what they want now.
      </p>
      <p className={styles.quoteAuthor}>- Emmanuel Acho -</p>
    </div>
  );
}
