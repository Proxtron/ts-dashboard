import { AppContext } from "../context/AppContext";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import BaseWidget from "../components/widgets/BaseWidget";

export default function Body() {

    const appContext = useContext(AppContext);
    if(!appContext) {
        return;
    }

    const {widgets} = appContext;
    
    return (
        <Box as="main" p="20px" position="relative" minH="100vh">
            {
                widgets.map(widget => <BaseWidget key={widget.id} type={widget.type}
                    x={widget.x} y={widget.y} id={widget.id}></BaseWidget>)
            }
        </Box>
    );
}