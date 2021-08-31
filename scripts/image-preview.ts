import fs from "fs-extra";
import path from "path";
import PQueue from "p-queue";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import jsonfile from "jsonfile";

import type { Article } from "../lib/interfaces/article.interface";

// Concurrent queue since sequentially loading previews is VERY slow
const queue = new PQueue({ concurrency: 12 });
process.setMaxListeners(24);

// Needed to get around cookie prompts and cloudflare redirects
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const captureMultipleScreenshots = async () => {
  // Check if directory is available and clear on new build
  const dirPath = path.join(process.cwd(), "./public/previews");
  try {
    await fs.access(dirPath);
    await fs.emptyDir(dirPath);
  } catch {
    await fs.mkdir(dirPath);
  }

  const articlePath = path.join(process.cwd(), "./config/articles.json");
  const articles: Article[] = await jsonfile.readFile(articlePath);

  const articlePromiseArr = [];
  for (const article of articles) {
    articlePromiseArr.push(queue.add(() => takeScreenshot(article, dirPath)));
  }

  // Wait for all articles in queue to resolve
  await Promise.all(articlePromiseArr);
  console.log(`\n${articles.length} screenshots captured.`);
};

const takeScreenshot = async (article: Article, dirPath: string) => {
  let browser = null;
  const { company, url, created } = article;

  try {
    // launch headless Chromium browser
    browser = await puppeteer.launch({
      headless: true,
    });
    // create new page object
    const page = await browser.newPage();

    // set viewport width and height
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto(url);
    await page.screenshot({
      path: `${dirPath}/${company.replace(/(\s)/g, "-")}-${created}.png`,
    });
    console.log(`Generated preview for ${company} - (${url})`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

captureMultipleScreenshots();
