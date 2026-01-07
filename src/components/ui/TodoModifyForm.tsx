import { Button, Box, Field, Input, Text, Textarea, HStack, useToken } from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext";
import { useContext, useState, type FormEvent } from "react";
import { v4 } from "uuid";
import type { TodoManagerState } from "../../routes/TodoBody";
import { useTodo } from "@/lib/get";

interface TodoModifyFormProps {
    widgetId: string,
    todoId: string,
    setTodoManagerState: (newState: TodoManagerState) => void
}

const TodoModifyForm = ({widgetId, todoId, setTodoManagerState}: TodoModifyFormProps) => {
    const appContext = useContext(AppContext)
    if(!appContext) {
        return;
    }
    const {widgets, widgetsDispatch} = appContext;

    const todo = useTodo(widgets, widgetId, todoId)

    const [defaultBorder] = useToken("colors", ["border.default"]);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState<Date | undefined>(todo.due);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        widgetsDispatch({
            type: "addTodo",
            widgetId,
            newTodoItem: {
                id: v4(),
                title,
                description,
                due: dueDate,
                completed: false
            }
        });
        setTodoManagerState("closed");
    }
    
    
    return (
    <Box bgColor="bg.surface" border={`1px solid ${defaultBorder}`} as="form" p={5} borderRadius={6} 
        onSubmit={handleSubmit}>
        <Field.Root required mb={2}>
            <Field.Label>
                Title
                <Field.RequiredIndicator />
            </Field.Label>
            <Input variant="outline" placeholder="e.g., Buy Groceries" onChange={event => setTitle(event.target.value)}/>
            <Field.HelperText />
            <Field.ErrorText />
        </Field.Root>
        <Field.Root mb={2}>
            <Field.Label>
                Description
                <Text color="text.muted">(optional)</Text>
            </Field.Label>
            <Textarea variant="outline" placeholder="Add details here..." rows={4} resize="none" 
                onChange={event => setDescription(event.target.value)}/>
            <Field.HelperText />
            <Field.ErrorText />
        </Field.Root>
        <Field.Root mb={2}>
            <Field.Label>
                Due Date
                <Text color="text.muted">(optional)</Text>
            </Field.Label>
            <Input type="date" variant="outline" placeholder="e.g., Buy Groceries" 
                onChange={event => {
                    if(event.target.value) {
                        setDueDate(new Date(event.target.value + 'T00:00:00'));
                    }
                }}/>
            <Field.HelperText />
            <Field.ErrorText />
        </Field.Root>
        <HStack gapX={4}>
            <Button type="submit" backgroundColor="accent.default" color="text.primary">Save</Button>
            <Button variant="outline" border={`1px solid ${defaultBorder}`} onClick={() => setTodoManagerState("closed")}>Cancel</Button>
        </HStack>
    </Box>
    )
}

export default TodoModifyForm;