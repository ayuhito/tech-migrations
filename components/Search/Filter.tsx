import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { Configure } from "react-instantsearch-dom";

import type { FilterProps } from "../../lib/interfaces/filterProps.interface";

const FilterPopoverContent = (props) => (
  <PopoverContent width="100%">
    <PopoverArrow />
    <PopoverBody
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "16px",
          borderRadius: "8px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `rgba(0, 0, 0, 0.1)`,
          borderRadius: "20px",
          border: "4px solid transparent",
          backgroundClip: "content-box",
        },
      }}
    >
      <SimpleGrid columns={2} spacing={4} maxHeight="300px" {...props} />
    </PopoverBody>
  </PopoverContent>
);

const Filter = ({
  fromFilterOrder,
  toFilterOrder,
  categoryFilterOrder,
}: FilterProps) => {
  const [filterItems, setFilterItems] = useState([]);

  const handleFilterChange = (filterValue: string) => {
    if (filterItems.includes(filterValue)) {
      const filteredArray = filterItems.filter((item) => item !== filterValue);
      console.log("1", filteredArray);
      setFilterItems(filteredArray);
    } else {
      console.log([...filterItems, filterValue]);
      setFilterItems([...filterItems, filterValue]);
    }
  };

  return (
    <>
      <Configure hitsPerPage={10} facetFilters={filterItems} />
      <Flex
        display={{ base: "flex", md: "flex" }}
        justify="flex-end"
        direction="row"
      >
        <Popover>
          <PopoverTrigger>
            <Button rightIcon={<ChevronDownIcon />}>From</Button>
          </PopoverTrigger>
          <FilterPopoverContent>
            {fromFilterOrder.map((language) => (
              <Checkbox
                key={language}
                value={`from:${language}`}
                onChange={(event) => handleFilterChange(event.target.value)}
              >
                {language}
              </Checkbox>
            ))}
          </FilterPopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button ml={4} rightIcon={<ChevronDownIcon />}>
              To
            </Button>
          </PopoverTrigger>
          <FilterPopoverContent>
            {toFilterOrder.map((language) => (
              <Checkbox
                key={language}
                value={`to:${language}`}
                onChange={(event) => handleFilterChange(event.target.value)}
              >
                {language}
              </Checkbox>
            ))}
          </FilterPopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button ml={4} rightIcon={<ChevronDownIcon />}>
              Category
            </Button>
          </PopoverTrigger>
          <FilterPopoverContent columns={1}>
            {categoryFilterOrder.map((type) => (
              <Checkbox
                key={type}
                value={`category:${type}`}
                onChange={(event) => handleFilterChange(event.target.value)}
                textTransform="capitalize"
              >
                {type}
              </Checkbox>
            ))}
          </FilterPopoverContent>
        </Popover>
      </Flex>
    </>
  );
};

export { Filter };
