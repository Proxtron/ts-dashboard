//Widgets

export type DashboardWidget = TodoWidget | WeatherWidget

interface BaseWidget {
    id: string
    type: WidgetType,
    x: number,
    y: number
}

export type WidgetType = "todo" | "weather"


export interface TodoWidget extends BaseWidget {
    todos: TodoItem[],
    type: "todo"
}

export interface WeatherWidget extends BaseWidget {
    location?: Location
    weatherNow?: WeatherState
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

export interface Location {
    city: string,
    state: string,
    country: string
}

export interface WeatherState {
    temperature: number,
    weatherCode: number,
    windSpeed: number,
    humidityPercentage: number,
    visiblity: number
}

//Reducer

interface ReducerBase {
    type: WidgetActionTypes
}

export type WidgetActionTypes = "add" | "move" | "toggleTodo" | "addTodo" | "editTodo" | "deleteTodo"

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

interface WidgetActionDeleteTodo extends ReducerBase {
    type: "deleteTodo",
    widgetId: string,
    removingTodoId: string
}

export type WidgetActions = WidgetActionAdd | WidgetActionMove | WidgetActionToggleTodo | WidgetActionAddTodo | WidgetActionEditTodo | WidgetActionDeleteTodo;