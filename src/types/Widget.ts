//Widgets

export type DashboardWidget = TodoWidget | NotesWidget | WeatherWidget

interface BaseWidget {
    id: string
    size: WidgetSize,
    type: WidgetType,
    x: number,
    y: number
}

export type WidgetType = "todo" | "notes" | "weather"

export type WidgetSize = "sm" | "md" | "lg"

export interface TodoWidget extends BaseWidget {
    todos: TodoItem[],
    type: "todo"
}

export interface NotesWidget extends BaseWidget {
    notes: Note[],
    type: "notes"
}

export interface WeatherWidget extends BaseWidget {
    forecast: WeatherDay[],
    type: "weather"
}


//Models
export interface TodoItem {
    title: string,
    description: string,
    due: Date,
    completed: boolean
}

export interface Note {
    text: string
}

export interface WeatherDay {
    maxTemp: number,
    minTemp: number
}

//Reducer

interface ReducerBase {
    type: WidgetActionTypes
}

export type WidgetActionTypes = "add" | "move" | "get"

interface WidgetActionAdd extends ReducerBase {
    type: "add",
    widgetType: WidgetType,
    size: WidgetSize
}

interface WidgetActionMove extends ReducerBase {
    type: "move",
    deltaX: number,
    deltaY: number,
    widgetId: string
}

export type WidgetActions = WidgetActionAdd | WidgetActionMove;