import InProgressTodos from "@/components/ui/InProgressTodos";
import TodoAddForm from "@/components/ui/TodoAddForm";
import TodoModifyForm from "@/components/ui/TodoModifyForm";
import { AppContext } from "@/context/AppContext";
import { getInProgressTodos, getWidget } from "@/lib/get";
import { Box, Button, Grid, Heading, HStack, useToken} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router";

export interface TodoManagerState {
    type: TodoManagerStateType
} 

export interface TodoManagerModify extends TodoManagerState {
    type: "modify",
    todoModifyingId: string
}

type TodoManagerStateType = "add" | "modify" | "closed"

const TodoBody = () => {
    const {widgetId} = useParams();
    if(!widgetId) {
        throw new Error("Error in URL, must include widgetId");
    }

    const appContext = useContext(AppContext);
    if(!appContext) return;
    const {widgets} = appContext;

    const thisWidget = getWidget(widgets, widgetId);
    if(thisWidget.type !== "todo") {
        throw new Error("Widget is not a todo widget");
    }

    const inProgressTodos = getInProgressTodos(thisWidget.todos);
    const [todoManagerState, setTodoManagerState] = useState<TodoManagerState | TodoManagerModify>({type: "closed"});
    const [secondary, borderDefault] = useToken("colors", ["text.secondary", "border.default"])

    return (
        <Grid minH="100vh" gridTemplateColumns="4fr 6fr" as="main" p={5}>
            <Box pr={4} borderRight={`1px solid ${borderDefault}`}>
                <HStack marginBottom={3}>
                    <Link to="/">
                        <ArrowLeft color={secondary}></ArrowLeft>
                    </Link>
                    <Heading marginLeft={2}>
                        Todo List Manager
                    </Heading>
                </HStack>
                <HStack mb={3}>
                    <Button color="text.primary" bgColor="accent.default" mx="auto" width="200px" 
                        onClick={() => setTodoManagerState({type: "add"})}>Add New Todo</Button>
                </HStack>
                {todoManagerState.type === "add" && <TodoAddForm setTodoManagerState={setTodoManagerState} widgetId={widgetId}/>}
                {todoManagerState.type === "modify" && <TodoModifyForm setTodoManagerState={setTodoManagerState} 
                    widgetId={widgetId} todoId={(todoManagerState as TodoManagerModify).todoModifyingId}/>}
            </Box>
            <Box pl={4}>
                <InProgressTodos inProgressTodos={inProgressTodos} widgetId={widgetId} setTodoManagerState={setTodoManagerState}/>
            </Box>
        </Grid>
    )
}

export default TodoBody;