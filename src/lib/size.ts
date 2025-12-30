import type { WidgetSize } from "@/types/Widget"

interface ElementSize {
    width: string,
    height: string
}

export const getElementSize = (size: WidgetSize) => {
    let elementSize: ElementSize;

    if(size === "sm") {
        elementSize = {
            width: "200px",
            height: "200px"
        }
    } else if(size === "md") {
        elementSize = {
            width: "400px",
            height: "280px"
        }
    } else {
        elementSize = {
            width: "520px",
            height: "450px"
        }
    }

    return elementSize;
}