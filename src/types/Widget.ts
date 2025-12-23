//Widgets

export type DashboardWidget = TodoWidget | NotesWidget | WeatherWidget

interface BaseWidget {
    id: number
    size: WidgetSize,
    type: WidgetType
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