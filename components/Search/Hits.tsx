import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Table,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { GrTechnology } from "react-icons/gr";
import { connectHits } from "react-instantsearch-dom";

import type { AlgoliaArticle } from "../../lib/interfaces/article.interface";

interface Slug {
  slug: string;
}

const HitIcon = ({ slug }: Slug) => {
  if (slug === "n/a") {
    return <Icon height="20px" as={GrTechnology} />;
  }
  return (
    <Image
      src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/${slug}.svg`}
      alt="Company logo"
      height="24px"
    />
  );
};

interface Hits {
  hits: AlgoliaArticle[];
}

const Hits = ({ hits }: Hits) => {
  const bgColor = useColorModeValue("white", "black");
  return (
    <Table variant="simple" backgroundColor={bgColor} rounded={10}>
      <Thead>
        <Tr>
          <Th>Company</Th>
          <Th>From</Th>
          <Th>To</Th>
          <Th>Category</Th>
          <Th>Created</Th>
        </Tr>
      </Thead>
      <Tbody>
        {hits.map((hit) => (
          <Tr key={hit.objectID}>
            <Td>
              <Flex direction="row" columns={2}>
                <Box alignSelf="center">
                  <HitIcon slug={hit.slug} />
                </Box>
                <Heading size="md">{hit.company}</Heading>
              </Flex>
            </Td>
            <Td>
              <Flex direction="row">
                {hit.from.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </Flex>
            </Td>
            <Td>
              <Flex direction="row">
                {hit.to.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </Flex>
            </Td>
            <Td>
              <Flex direction="row">
                {hit.category.map((item) => (
                  <Tag key={item} textTransform="capitalize">
                    {item}
                  </Tag>
                ))}
              </Flex>
            </Td>
            <Td>
              <Tag>
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "numeric",
                  day: "2-digit",
                }).format(new Date(hit.created))}
              </Tag>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const CustomHits = connectHits(Hits);
