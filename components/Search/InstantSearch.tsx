import { Button, Stack } from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import { connectStateResults, InstantSearch } from "react-instantsearch-dom";

import { FilterProps } from "../../lib/interfaces/filterProps.interface";
import { Filter } from "./Filter";
import { CustomHits } from "./Hits";
import { CustomPagination } from "./Pagination";

const indexName = "prod_ARTICLES";
const searchClient = algoliasearch(
  "TSN5KZYRQY",
  "c68474a93f6ee25f636d98c9b0eab2a1"
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoadingIndicator = connectStateResults(
  ({ isSearchStalled }) =>
    isSearchStalled && (
      <Stack mt={2} direction="column">
        <Button isLoading />
      </Stack>
    )
);

export const AlgoliaBlock = (props: FilterProps) => {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Filter {...props} />
      <CustomHits />
      <CustomPagination articleCount={props.articleCount} />
    </InstantSearch>
  );
};
