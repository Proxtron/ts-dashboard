import { Popover, HStack, Button } from "@chakra-ui/react"
import type { Dispatch } from "react"
import type { WidgetActions } from "../../types/Widget"
import type { TodoManagerModify, TodoManagerState } from "@/routes/TodoBody"

interface ConfirmDeletePopoverProps {
    todoId: string,
    widgetId: string,
    widgetsDispatch: Dispatch<WidgetActions>,
    setTodoManagerState: (newState: TodoManagerState | TodoManagerModify) => void
}

const ConfirmDeletePopover = ({todoId, widgetId, widgetsDispatch, setTodoManagerState}: ConfirmDeletePopoverProps) => {
    return (
        <Popover.Content width="auto" justifyContent="center">
            <Popover.CloseTrigger />
            <Popover.Arrow>
                <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Body>
                <Popover.Title mb={3} textAlign="center" fontWeight={500}>Delete this Todo?</Popover.Title>
                <HStack>
                    <Popover.CloseTrigger>
                        <Button size="xs" variant="ghost">Cancel</Button>
                    </Popover.CloseTrigger>
                    <Button size="xs" color="text.primary" bgColor="accent.default" onClick={() => {
                        setTodoManagerState({type: "closed"})
                        widgetsDispatch({
                            type: "deleteTodo",
                            widgetId: widgetId,
                            removingTodoId: todoId
                        })
                    }} >Delete</Button>
                </HStack>
            </Popover.Body>    
        </Popover.Content>
        
    )   
}

export default ConfirmDeletePopover;