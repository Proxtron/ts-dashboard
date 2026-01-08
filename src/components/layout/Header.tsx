import { Heading, Flex, HStack, Separator, Icon } from "@chakra-ui/react";
import AddWidgetDialog from "../ui/AddWidgetDialog";
import { ColorModeButton } from "../ui/color-mode";
import Logo from "@/assets/dashboard-icon.svg";

function Header() {
    return (
        <Flex as="header" height="100%" alignItems="center" justifyContent="space-between" px={6}>
            <HStack gapX={5}>
                <img src={Logo} style={{
                    width: "36px"
                }}></img>
                <Heading as="h1" color="text.primary" fontSize="24px">Productivity Dashboard</Heading>
            </HStack>
            <HStack gapX={5}>
                <AddWidgetDialog />
                <Separator borderColor="border.default" orientation="vertical" height="8" />
                <HStack>
                    <ColorModeButton />
                </HStack>
            </HStack>
        </Flex>
    )
}

export default Header;