import { getElementSize } from "@/lib/size";
import type { WidgetSize, WidgetType } from "@/types/Widget";
import { Card } from "@chakra-ui/react";
import TodoWidget from "./TodoWidget";
import NotesWidget from "./NotesWidget";
import WeatherWidget from "./WeatherWidget";

interface BaseWidgetProps {
    size: WidgetSize,
    type: WidgetType
}

const BaseWidget = ({size, type}: BaseWidgetProps) => {
    const elementSize = getElementSize(size);

    return (
        <Card.Root w={elementSize.width} h={elementSize.height}>
            {type === "todo" && <TodoWidget/>}
            {type === "notes" && <NotesWidget/>}
            {type === "weather" && <WeatherWidget/>}
        </Card.Root>
    )
}

export default BaseWidget;