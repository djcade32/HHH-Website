import React from "react";
import styles from "./ArticleCard.module.css";
import fioneersLogo from "../../assets/websiteIcons/fioneers-ico.png";
import aohlIcon from "../../assets/websiteIcons/aohl-heart-ico.png";

export default function ArticleCard(props) {
  const { articleInfo } = props;
  function getWebsiteIcon(websiteName) {
    switch (websiteName) {
      case "AOHL":
        return aohlIcon;
      case "FIONEERS":
        return fioneersLogo;
      default:
        break;
    }
  }

  return (
    <a className={styles.articleCardContainer} href={articleInfo.articleUrl}>
      <img
        className={styles.articleSrcLogo}
        src={getWebsiteIcon(articleInfo.website)}
        alt=""
      />
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
