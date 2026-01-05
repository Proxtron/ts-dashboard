import type { WidgetType } from "@/types/Widget";
import { Box } from "@chakra-ui/react";
import TodoWidget from "./TodoWidget";
import NotesWidget from "./NotesWidget";
import WeatherWidget from "./WeatherWidget";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import { type CSSProperties } from "react";

interface BaseWidgetProps {
    type: WidgetType,
    x: number,
    y: number,
    id: string
}

const BaseWidget = ({ type, x, y, id }: BaseWidgetProps) => {
    const { attributes, listeners, transform, setNodeRef, setActivatorNodeRef } = useDraggable({
        id: id,
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        position: "absolute",
        left: x,
        top: y
    }

    return (
        <Box ref={setNodeRef} style={style}
            {...attributes}>
                {type === "todo" && <TodoWidget id={id} listeners={listeners} setActivatorNodeRef={setActivatorNodeRef}/>}
                {type === "notes" && <NotesWidget />}
                {type === "weather" && <WeatherWidget />}
        </Box>
    )
}

export default BaseWidget;