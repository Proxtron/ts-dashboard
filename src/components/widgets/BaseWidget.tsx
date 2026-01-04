import { getElementSize } from "@/lib/size";
import type { WidgetSize, WidgetType } from "@/types/Widget";
import { Button, Card, GridItem, useToken } from "@chakra-ui/react";
import TodoWidget from "./TodoWidget";
import NotesWidget from "./NotesWidget";
import WeatherWidget from "./WeatherWidget";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from "lucide-react";
import { type CSSProperties } from "react";

interface BaseWidgetProps {
    size: WidgetSize,
    type: WidgetType,
    x: number,
    y: number,
    id: string
}

const BaseWidget = ({ size, type, x, y, id }: BaseWidgetProps) => {
    const elementSize = getElementSize(size);
    const [iconColor] = useToken("colors", ["accent.default"]);

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
        <Card.Root ref={setNodeRef} style={style} w={elementSize.width} h={elementSize.height}
            {...attributes}>
            <Card.Body display="grid" p={4} pr={1} gridTemplateColumns="repeat(10, 1fr)">
                <GridItem gridColumn="1/10">
                    {type === "todo" && <TodoWidget id={id}/>}
                    {type === "notes" && <NotesWidget />}
                    {type === "weather" && <WeatherWidget />}
                </GridItem>
                <GridItem alignSelf="center">
                    <Button ref={setActivatorNodeRef} {...listeners} p={0} variant="ghost">
                        <GripVertical color={iconColor} />
                    </Button>
                </GridItem>
            </Card.Body>
        </Card.Root>
    )
}

export default BaseWidget;