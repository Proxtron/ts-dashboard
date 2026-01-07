//Widgets

export type DashboardWidget = TodoWidget | NotesWidget | WeatherWidget

interface BaseWidget {
    id: string
    type: WidgetType,
    x: number,
    y: number
}

export type WidgetType = "todo" | "notes" | "weather"


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
    description?: string,
    due?: Date,
    completed: boolean,
    id: string
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

export type WidgetActionTypes = "add" | "move" | "toggleTodo" | "addTodo" | "editTodo"

interface WidgetActionAdd extends ReducerBase {
    type: "add",
    widgetType: WidgetType,
}

interface WidgetActionMove extends ReducerBase {
    type: "move",
    deltaX: number,
    deltaY: number,
    widgetId: string
}

interface WidgetActionToggleTodo extends ReducerBase {
    type: "toggleTodo",
    widgetId: string,
    todoId: string
}

interface WidgetActionAddTodo extends ReducerBase {
    type: "addTodo",
    widgetId: string,
    newTodoItem: TodoItem
}

interface WidgetActionEditTodo extends ReducerBase {
    type: "editTodo",
    widgetId: string,
    todoId: string,
    newTodoAttributes: Omit<TodoItem, "id">
}

export type WidgetActions = WidgetActionAdd | WidgetActionMove | WidgetActionToggleTodo | WidgetActionAddTodo | WidgetActionEditTodo;