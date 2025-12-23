import type { WidgetSize, WidgetType } from "@/types/Widget"
import { Dialog, Button, Field, RadioGroup, HStack } from "@chakra-ui/react"
import { X, Plus } from "lucide-react"
import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext";

const AddWidgetDialog = () => {
    const [type, setType] = useState<WidgetType>("todo");
    const [size, setSize] = useState<WidgetSize>("md");

    const appContext = useContext(AppContext);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button bg="accent.default" variant="subtle">
                    <Plus />
                    Add Widget
                </Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger >
                        <Button variant="ghost"><X /></Button>
                    </Dialog.CloseTrigger>
                    <Dialog.Header>
                        <Dialog.Title>Add Widget</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>

                        <Field.Root mb={6}>
                            <Field.Label fontSize="16px" mb={3}>
                                Type
                                <Field.RequiredIndicator />
                            </Field.Label>

                            <RadioGroup.Root value={type} onValueChange={(event) => setType(event.value as WidgetType)}>
                                <HStack gap={3}>
                                    <RadioGroup.Item value="todo">
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator/>
                                        <RadioGroup.ItemText>Todo List</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="notes">
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator/>
                                        <RadioGroup.ItemText>Notes</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="weather">
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator/>
                                        <RadioGroup.ItemText>Weather</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                </HStack>
                            </RadioGroup.Root>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label fontSize="16px" mb={3}>
                                Size
                                <Field.RequiredIndicator />
                            </Field.Label>

                            <RadioGroup.Root value={size} onValueChange={(event) => setSize(event.value as WidgetSize)}>
                                <HStack gap={3}>
                                    <RadioGroup.Item value="sm">
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator/>
                                        <RadioGroup.ItemText>Small</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="md">
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator/>
                                        <RadioGroup.ItemText>Medium</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="lg">
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator/>
                                        <RadioGroup.ItemText>Large</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                </HStack>
                            </RadioGroup.Root>
                        </Field.Root>
                    </Dialog.Body>
                    <Dialog.Footer justifyContent="center">
                        <Dialog.ActionTrigger>
                            <Button onClick={() => appContext?.addWidget(type, size)} variant="outline"><Plus /></Button>
                        </Dialog.ActionTrigger>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}

export default AddWidgetDialog;