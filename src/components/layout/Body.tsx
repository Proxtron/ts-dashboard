import { AppContext } from "../../context/AppContext";
import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import AddWidgetDialog from "../ui/AddWidgetDialog";
import BaseWidget from "../widgets/BaseWidget";

export default function Body() {

    const appContext = useContext(AppContext);
    return (
        <Box as="main" p="20px">
            <Flex justifyContent="right" mb={3}>
                <AddWidgetDialog/>
            </Flex>

            <Box>
                {
                    appContext?.widgets.map(widget => <BaseWidget key={widget.id} size={widget.size} type={widget.type}></BaseWidget>)
                }
            </Box>
        </Box>
    );
}