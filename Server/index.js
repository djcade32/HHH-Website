const express = require("express");
const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

const path = require("path");
const helpers = require("./helpers");

const app = express();

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

app.post("/test", (req, res) => {
  console.log("Connected to React!");
  res.redirect("/");
});

// Api endpoint to scrape and receive Art of Healthy Living articles
app.get("/api/artOfHealthyLivingScrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://artofhealthyliving.com/", { waitUntil: "load" });

    // Scroll to the bottom of the page with puppeteer-autoscroll-down

    await scrollPageToBottom(page);
    // Scrapping neccessary info from articles
    const grabArticles = await page.evaluate(() => {
      const articles = document.querySelectorAll(
        ".grids.grid-layout.entries article"
      );

      let articleObjects = [];
      // Iterate through all articles to create article Objects
      articles.forEach((article) => {
        const title = article.querySelector("header .entry-title").innerText;
        const imgUrl = article
          .querySelector(".entry-image img")
          .getAttribute("src");
        const description = article.querySelector(".entry-summary p").innerText;
        let date = article.querySelector(".entry-meta time").innerText;
        date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();
        const articleUrl = article
          .querySelector("figure a")
          .getAttribute("href");

        const articleObject = {
          imgUrl: imgUrl,
          title: title,
          description: description,
          date: date,
          articleUrl: articleUrl,
          website: "AOHL",
          tag: "HEALTH",
        };

        articleObjects.push(articleObject);
      });
      return articleObjects;
    });
    console.log("Successfully Scraped Art of Healthy Living website");
    console.log("Number of articles fetched: ", grabArticles.length);
    res.json(grabArticles);
    await browser.close();
  } catch (error) {
    console.log("Error scrapping Art of Healthy Living website: ", error);
    res.sendStatus(500).json({});
    await browser.close();
  }
});

// Api endpoint to scrape and receive Fioneers articles
app.get("/api/fioneersScrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://thefioneers.com/", { waitUntil: "load" });

    // Scroll to the bottom of the page with puppeteer-autoscroll-down
    await scrollPageToBottom(page);

    // Scrapping neccessary info from articles
    const grabArticles = await page.evaluate(() => {
      const articles = document.querySelectorAll(
        ".et_pb_ajax_pagination_container article"
      );

      let articleObjects = [];
      // Iterate through all articles to create article Objects
      articles.forEach((article) => {
        const title = article.querySelector(".entry-title").innerText;
        const imgUrl = article
          .querySelector(".entry-featured-image-url img")
          .getAttribute("src");
        const description = article.querySelector(
          ".post-content-inner p"
        ).innerText;
        const date = article.querySelector(".post-meta .published").innerText;
        const articleUrl = article
          .querySelector(".post-content a")
          .getAttribute("href");

        const articleObject = {
          imgUrl: imgUrl,
          title: title,
          description: description,
          date: date,
          articleUrl: articleUrl,
          website: "FIONEERS",
          tag: "FINANCE",
        };

        articleObjects.push(articleObject);
      });
      return articleObjects;
    });
    console.log("Successfully Scraped Fioneers website");
    console.log("Number of articles fetched: ", grabArticles.length);
    res.json(grabArticles);
    await browser.close();
  } catch (error) {
    console.log("Error scrapping Fioneers website: ", error);
    res.sendStatus(500).json({});
    await browser.close();
  }
});

// Api endpoint to scrape and receive Make Use of Mental Health articles
app.get("/api/makeUseOfScrape/Happiness", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.makeuseof.com/tag/mental-health/", {
      waitUntil: "load",
    });
    // Scroll to the bottom of the page with puppeteer-autoscroll-down
    await scrollPageToBottom(page);
    // Scrapping neccessary info from articles
    const grabArticles = await page.evaluate(() => {
      const numOfArticlesToFetch = 9;
      let articles = [];

      // A special case to get the main article on the website
      const mainArticle = document.querySelector(
        ".sentinel-listing-page-list.browse-half.clip-half .browse-clip.browse-custom.item-1.js-content"
      );
      articles.push(mainArticle);

      // Fetch number of specified articles and add to articles list
      for (let i = 2; i <= numOfArticlesToFetch; i++) {
        const article = document.querySelector(
          ".sentinel-listing-page-list.browse-half.clip-half .browse-clip.item-" +
            i +
            ".js-content"
        );
        articles.push(article);
      }

      let articleObjects = [];
      // Iterate through all articles to create article Objects
      articles.forEach((article) => {
        const title = article.querySelector(".bc-info .bc-title a").innerText;
        const imgUrl = article
          .querySelector(".bc-img-link picture source")
          .getAttribute("srcset");
        const description = article.querySelector(
          ".bc-info .bc-excerpt"
        ).innerText;
        let date = article
          .querySelector(".bc-details time")
          .getAttribute("datetime");
        date = new Date(date);
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        date =
          months[date.getMonth()] +
          " " +
          date.getDate() +
          ", " +
          date.getFullYear();

        const articleUrl =
          "https://www.makeuseof.com" +
          article.querySelector(".bc-img-link").getAttribute("href");

        const articleObject = {
          imgUrl: imgUrl,
          title: title,
          description: description,
          date: date,
          articleUrl: articleUrl,
          website: "MUO",
          tag: "HAPPINESS",
        };

        articleObjects.push(articleObject);
      });
      amountOfArticlesFetched = articleObjects.length;
      return articleObjects;
    });
    console.log(
      "Successfully Scraped Make Use of website for mental health articles"
    );
    console.log("Number of articles fetched: ", grabArticles.length);
    res.json(grabArticles);
    await browser.close();
  } catch (error) {
    console.log(
      "Error scrapping Make Use of website for mental health articles: ",
      error
    );
    res.sendStatus(500).json({});
    await browser.close();
  }
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.send("The endpoint you are trying to call does not exist");
  // res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log("App is listening on port " + port);
