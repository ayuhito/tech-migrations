import jsonfile from "jsonfile";
import path from "path";

import type { Article } from "../lib/interfaces/article.interface";

const sortArticles = () => {
  const config = path.join(process.cwd(), "./config/articles.json");
  const articles: Article[] = jsonfile.readFileSync(config);

  // Sorts in descending order
  articles.sort((a, b) => {
    const aDate = new Date(a.created);
    const bDate = new Date(b.created);
    return +bDate - +aDate;
  });

  jsonfile.writeFileSync(config, articles);
};

sortArticles();
