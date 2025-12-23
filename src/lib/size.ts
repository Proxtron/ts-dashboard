import type { WidgetSize } from "@/types/Widget"

interface ElementSize {
    width: string,
    height: string
}

export const getElementSize = (size: WidgetSize) => {
    let elementSize: ElementSize;

    if(size === "sm") {
        elementSize = {
            width: "150px",
            height: "150px"
        }
    } else if(size === "md") {
        elementSize = {
            width: "300px",
            height: "150px"
        }
    } else {
        elementSize = {
            width: "300px",
            height: "300px"
        }
    }

    return elementSize;
}