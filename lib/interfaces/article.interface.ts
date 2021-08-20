export interface Article {
  company: string;
  from: string[];
  to: string[];
  category: Category[];
  created: string;
}

export type Category = "languages" | "databases" | "frameworks" | "other";
