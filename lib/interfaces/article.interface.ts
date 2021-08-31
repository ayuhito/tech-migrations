export type Category = "languages" | "databases" | "frameworks" | "other";

export interface Article {
  company: string;
  from: string[];
  to: string[];
  category: Category[];
  url: string;
  created: string;
  slug: string;
}

export interface AlgoliaArticle extends Article {
  objectID: string;
}
