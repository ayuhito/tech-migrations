import {
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { AiFillGithub } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";

import { NextChakraLink } from "./NextChakraLink";

export const Logo = (props: ButtonProps) => {
  return (
    <NextChakraLink href="/">
      <Button
        width="100%"
        size="md"
        variant="ghost"
        colorScheme="gray"
        fontWeight="700"
        {...props}
      >
        Tech Migrations
      </Button>
    </NextChakraLink>
  );
};

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label={`Toggle ${colorMode} mode`}
      variant="ghost"
      fontSize="xl"
      onClick={toggleColorMode}
      icon={<CgDarkMode />}
    />
  );
};

type NavbarContainerProps = PropsWithChildren<FlexProps>;

const NavbarContainer = ({ children, ...props }: NavbarContainerProps) => {
  const bgColor = useColorModeValue("white", "black");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={3}
      backgroundColor={bgColor}
      borderBottom="1px solid"
      borderBottomColor={borderColor}
      {...props}
    >
      {children}
    </Flex>
  );
};

export const Navbar = (props) => (
  <NavbarContainer {...props}>
    <Logo />
    <Stack
      direction="row"
      spacing={4}
      align="center"
      justify="flex-end"
      {...props}
    >
      <IconButton
        aria-label="Github link"
        variant="ghost"
        fontSize="xl"
        icon={<AiFillGithub />}
      />
      <DarkModeSwitch />
    </Stack>
  </NavbarContainer>
);
