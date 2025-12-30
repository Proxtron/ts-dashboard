import { AppContext } from "../context/AppContext";
import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import AddWidgetDialog from "../components/ui/AddWidgetDialog";
import BaseWidget from "../components/widgets/BaseWidget";

export default function Body() {

    const appContext = useContext(AppContext);
    if(!appContext) {
        return;
    }

    const {widgets} = appContext;
    
    return (
        <Box as="main" p="20px" position="relative" minH="100vh">
            <Flex justifyContent="right" mb={3}>
                <AddWidgetDialog />
            </Flex>
            {
                widgets.map(widget => <BaseWidget key={widget.id} size={widget.size} type={widget.type}
                    x={widget.x} y={widget.y} id={widget.id}></BaseWidget>)
            }
        </Box>
    );
}