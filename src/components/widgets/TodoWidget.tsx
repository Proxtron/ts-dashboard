import { AppContext } from "@/context/AppContext";
import { getWidget } from "../../lib/get.ts";
import { Card, Heading, Button, List, Checkbox, HStack, useToken, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";
import { Calendar, Grip, Plus } from "lucide-react";
import { format } from "date-fns";
import { getTodoDisplayOrder, getInProgressTodos } from "../../lib/get.ts";


interface TodoWidgetProps {
    id: string,
    setActivatorNodeRef: (element: HTMLElement | null) => void,
    listeners: SyntheticListenerMap | undefined
}

const TodoWidget = ({ id, setActivatorNodeRef, listeners }: TodoWidgetProps) => {
    const [iconColor] = useToken("colors", ["accent.default"]);

    const appContext = useContext(AppContext);
    if (!appContext) {
        return;
    }
    const { widgetsDispatch, widgets } = appContext;

    let widget = getWidget(widgets, id);
    if (widget.type !== "todo") {
        throw new Error(`TodoWidget component can only render widgets of type TodoWidget`);
    }

    const displayTodos = getTodoDisplayOrder(getInProgressTodos(widget.todos));

    return (
        <Card.Root w="400px" h="320px">
            <Card.Header>
                <Link to={`/todos/${id}`}>
                    <Button variant="ghost" paddingX={0} mb={3}>
                        <Heading as="h1">Todo List</Heading>
                    </Button>
                </Link>    
            </Card.Header>
        
            <Card.Body py={0} mb={3} overflowY="auto" scrollbarWidth="2">
                <List.Root listStyle="none">
                    {
                        displayTodos.map((todo) =>
                            <List.Item key={todo.id} mb={1.5}>
                                <HStack justifyContent="space-between">
                                    <Checkbox.Root checked={todo.completed} onChange={() => {
                                        widgetsDispatch({
                                            type: "toggleTodo",
                                            widgetId: id,
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
                                    {
                                        todo.due && (
                                            <Text color="text.secondary" fontSize="14px">
                                                <HStack>
                                                    <Calendar size="14"/>
                                                    {format(todo.due, "MMM d")}
                                                </HStack>
                                                
                                            </Text>
                                              
                                        )
                                    }
                                    
                                </HStack>
                                
                            </List.Item>
                        )
                    }
                </List.Root>    
            </Card.Body>
            
            <Card.Footer>
                <HStack>
                    <Link to={`/todos/${id}`}>
                        <Button bgColor="accent.default" color="text.primary" borderRadius={6}>
                            <Plus></Plus>
                            Add Task
                        </Button>
                    </Link>
                    
                    <Button ref={setActivatorNodeRef} {...listeners} p={0} variant="ghost">
                        <Grip color={iconColor} />
                    </Button>
                </HStack>    
            </Card.Footer>
        </Card.Root>
    );
}

export default TodoWidget;