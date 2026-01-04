import { AppContext } from "@/context/AppContext";
import { getWidget } from "../../lib/get.ts";
import type { TodoItem } from "@/types/Widget";
import { Box, Heading, Button, List, Checkbox } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router";
import { v4 } from "uuid";

interface TodoWidgetProps {
    id: string
}

const TodoWidget = ({ id }: TodoWidgetProps) => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        return;
    }

    const { widgetsDispatch, widgets } = appContext;

    let widget = getWidget(widgets, id);
    if (widget.type !== "todo") {
        throw new Error(`TodoWidget component can only render widgets of type TodoWidget`);
    }

    const todos: TodoItem[] = [
        { title: "Todo Item 1", completed: false, id: v4() },
        { title: "Todo Item 2", completed: false, id: v4() },
        { title: "Todo Item 3", completed: false, id: v4() }
    ]


    return (
        <Box>
            <Link to={`/todos/${id}`}>
                <Button variant="ghost" paddingX={0} mb={3}>
                    <Heading>Todo List</Heading>
                </Button>
            </Link>

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
        </Box>
    );
}

export default TodoWidget;