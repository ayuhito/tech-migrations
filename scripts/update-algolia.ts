import algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
import jsonfile from "jsonfile";
import path from "path";

import type { AlgoliaArticle } from "../lib/interfaces/article.interface";

const articlePath = path.join(process.cwd(), "./config/articles.json");
const articleArr: AlgoliaArticle[] = jsonfile.readFileSync(articlePath);

// Copy all metadatas into one array
articleArr.forEach(
  (article) =>
    (article.objectID = `${article.company
      .replace(/(\s)/g, "-")
      .toLowerCase()}-${article.created}`)
);

// Initialise Algolia client
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const client = algoliasearch(
  "TSN5KZYRQY",
  process.env.ALGOLIA_ADMIN_KEY as string
);
const index = client.initIndex("prod_ARTICLES");

index
  .saveObjects(articleArr)
  .then(() => console.log("Updated articles."))
  .catch((error) => console.log(error));
