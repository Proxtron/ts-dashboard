import { AppContext } from "@/context/AppContext";
import { getWidget } from "../../lib/get.ts";
import { Card, Heading, Button, List, Checkbox, HStack, useToken } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";
import { Grip, Plus } from "lucide-react";

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

    return (
        <Card.Root w="400px" h="280px">
            <Card.Header>
                <Link to={`/todos/${id}`}>
                    <Button variant="ghost" paddingX={0} mb={3}>
                        <Heading as="h1">Todo List</Heading>
                    </Button>
                </Link>    
            </Card.Header>
        
            <Card.Body py={0}>
                <List.Root listStyle="none">
                    {
                        widget.todos.map((todo) =>
                            <List.Item key={todo.id}>
                                <Checkbox.Root onChange={() => {
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
                                    />
                                    <Checkbox.Label>{todo.title}</Checkbox.Label>
                                </Checkbox.Root>
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