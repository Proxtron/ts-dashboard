import TodoManagementForm from "@/components/ui/TodoManagementForm";
import { Box, Grid, Heading, HStack, useToken} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
const TodoBody = () => {
    const {widgetId} = useParams();
    
    if(!widgetId) {
        throw new Error("Error in URL, must include widgetId");
    }

    const [secondary] = useToken("colors", ["text.secondary"])
    return (
        <Grid gridTemplateColumns="4fr 6fr" as="main" p={5}>
            <Box>
                <HStack marginBottom={3}>
                    <Link to="/">
                        <ArrowLeft color={secondary}></ArrowLeft>
                    </Link>
                    <Heading marginLeft={2}>
                        Todo List Manager
                    </Heading>
                </HStack>
                <TodoManagementForm widgetId={widgetId}/>
            </Box>
        </Grid>
    )
}

export default TodoBody;