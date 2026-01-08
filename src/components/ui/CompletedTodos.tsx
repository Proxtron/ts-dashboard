import { Box, HStack, Heading, Text, List, Checkbox, useToken } from "@chakra-ui/react";
import type { TodoItem } from "@/types/Widget";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { format } from "date-fns";
import { Trash } from "lucide-react";

interface CompletedTodosProps {
    completedTodos: TodoItem[]
    widgetId: string,
}

const CompletedTodos = ({completedTodos, widgetId}: CompletedTodosProps) => {
    const appContext = useContext(AppContext);
    if(!appContext) return;
    const {widgetsDispatch} = appContext;
    const [borderDefault, textSecondary] = useToken("colors", ["border.default", "text.secondary"]);

    return (
        <Box p={3} borderRadius={6} border={`1px solid ${borderDefault}`}>
            <HStack mb={3}>
                <Heading>Completed</Heading>
                <Text bgColor="bg.subtle" px={2} py={1} borderRadius={6}>({completedTodos.length})</Text>
            </HStack>
            <List.Root listStyle="none" gapY={2}>
            {
                completedTodos.map((todo) => 
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
                                    <Checkbox.Label 
                                        _checked={{
                                            color: "text.secondary",
                                            textDecoration: "line-through"
                                        }}
                                        _hover={{
                                            cursor: "pointer"
                                        }}
                                    >{todo.title}</Checkbox.Label>
                                </Checkbox.Root>
                                {todo.due && <Text color="text.secondary" fontSize={14}>Due: {format(todo.due, "MMM d, y")}</Text>}    
                            </Box>
                            <HStack gapX={3}>
                                <Trash cursor="pointer" color={textSecondary} onClick={() => widgetsDispatch({
                                    type: "deleteTodo",
                                    widgetId: widgetId,
                                    removingTodoId: todo.id
                                })}/>
                            </HStack>
                        </HStack>
                        
                    </List.Item>
                )
            }    
            </List.Root>
            
        </Box>
    )
}

export default CompletedTodos;