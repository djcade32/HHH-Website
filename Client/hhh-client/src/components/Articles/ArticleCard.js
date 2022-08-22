import React from "react";
import styles from "./ArticleCard.module.css";
import logo from "../../assets/websiteIcons/fioneers-ico.png";

export default function ArticleCard(props) {
  const { articleInfo } = props;
  return (
    <a className={styles.articleCardContainer} href={props.url}>
      <img className={styles.articleSrcLogo} src={logo} alt="" />
      <img className={styles.image} src={articleInfo.imgUrl} alt="" />
      <div className={styles.textContainer}>
        <p className={styles.title}>{articleInfo.title}</p>
        <p className={styles.description}>{articleInfo.description}</p>
        <p className={styles.details}>
          {articleInfo.date} | {articleInfo.tag}
        </p>
      </div>
    </a>
  );
}
