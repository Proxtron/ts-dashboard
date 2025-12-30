import { AppContext } from "@/context/AppContext";
import { Box, Heading } from "@chakra-ui/react";
import { useContext } from "react";

const TodoWidget = () => {
    const appContext = useContext(AppContext);

    if(!appContext) {
        return;
    }
    

    return (
        <Box>
            <Heading>Todo List</Heading>
            
        </Box>
    );
}

export default TodoWidget;