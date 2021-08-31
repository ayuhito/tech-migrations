import { Heading } from "@chakra-ui/react";
import Head from "next/head";

import { Main } from "../components/Main";
import { PageContainer } from "../components/PageContainer";
import { AlgoliaBlock } from "../components/Search/InstantSearch";
import articlesData from "../config/articles.json";
import type { FilterProps } from "../lib/interfaces/filterProps.interface";

export default function Index(props: FilterProps) {
  return (
    <PageContainer>
      <Head>
        <title>Tech Migrations Directory</title>
      </Head>
      <Main>
        <Heading>Articles</Heading>
        <AlgoliaBlock {...props} />
      </Main>
    </PageContainer>
  );
}

type ObjectKeys = "from" | "to" | "category";

export async function getStaticProps() {
  const sortAlphabetically = (objectKey: ObjectKeys): string[] => {
    const keyArr: string[] = [];
    for (const article of articlesData) {
      keyArr.push(...article[objectKey]);
    }

    // Remove duplicates
    const uniqKeyArr = [...new Set(keyArr)];

    // Sort alphabetically
    return uniqKeyArr.sort((a, b) => a.localeCompare(b));
  };
  // Orders all available in alphabetical order
  const fromFilterOrder = await sortAlphabetically("from");
  const toFilterOrder = await sortAlphabetically("to");
  const categoryFilterOrder = await sortAlphabetically("category");
  const articleCount = articlesData.length;

  return {
    props: {
      fromFilterOrder,
      toFilterOrder,
      categoryFilterOrder,
      articleCount,
    },
  };
}
