import { Box, useToken, HStack, Heading, Text, Checkbox, List } from "@chakra-ui/react";
import type { TodoItem } from "@/types/Widget";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import type { TodoManagerModify, TodoManagerState } from "@/routes/TodoBody";
interface InProgressTodosProps {
    inProgressTodos: TodoItem[],
    widgetId: string,
    setTodoManagerState: (newState: TodoManagerState | TodoManagerModify) => void
}

const InProgressTodos = ({inProgressTodos, widgetId, setTodoManagerState}: InProgressTodosProps) => {
    const appContext = useContext(AppContext);
    if(!appContext) return;
    const {widgetsDispatch} = appContext;

    const [borderDefault, textSecondary] = useToken("colors", ["border.default", "text.secondary"])
    
    return (
        <Box p={3} borderRadius={6} border={`1px solid ${borderDefault}`}>
            <HStack mb={3}>
                <Heading>In Progress</Heading>
                <Text bgColor="bg.subtle" px={2} py={1} borderRadius={6}>({inProgressTodos.length})</Text>
            </HStack>
            <List.Root listStyle="none" gapY={2}>
            {
                inProgressTodos.map((todo) => 
                    <List.Item bgColor="bg.surface" border={`1px solid ${borderDefault}`} borderRadius={6} p={3} key={todo.id}>
                        <HStack justifyContent="space-between">
                            <Box>
                                <Checkbox.Root checked={todo.completed} onChange={() => {
                                    widgetsDispatch({
                                        type: "toggleTodo",
                                        widgetId: widgetId,
                                        todoId: todo.id
                                    });
                                }}>
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control
                                        _checked={{
                                            bg: "accent.default",
                                            borderColor: "accent.default",
                                            color: "text.primary"
                                        }}
                                        _hover={{
                                            cursor: "pointer",
                                            borderColor: "accent.default",
                                            color: "text.primary"
                                        }}
                                    />
                                    <Checkbox.Label _hover={{
                                        cursor: "pointer"
                                    }}>{todo.title}</Checkbox.Label>
                                </Checkbox.Root>
                                {todo.due && <Text color="text.secondary" fontSize={14}>Due: {format(todo.due, "MMM d, y")}</Text>}    
                            </Box>
                            <HStack gapX={3}>
                                <Pencil cursor="pointer" color={textSecondary} onClick={() => setTodoManagerState({type: "modify", todoModifyingId: todo.id})}/>
                                <Trash cursor="pointer" color={textSecondary}/>
                            </HStack>
                        </HStack>
                        
                    </List.Item>
                )
            }    
            </List.Root>
            
        </Box>
    )
}

export default InProgressTodos