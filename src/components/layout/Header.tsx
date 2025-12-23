import { Heading, Flex } from "@chakra-ui/react";

function Header() {
    return (
        <Flex as="header" height="100%" alignItems="center" justifyContent="center">
            <Heading as="h1" color="text.primary">Productivity Dashboard</Heading>
        </Flex>
    )
}

export default Header;