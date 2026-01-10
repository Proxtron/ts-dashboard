import type { DashboardWidget, TodoItem } from "@/types/Widget";
import { compareAsc } from "date-fns";
import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, Snowflake, CloudLightning } from "lucide-react";

export const getWidget = (widgets: DashboardWidget[], id: string) => {
    const widget = widgets.find((widget) => widget.id === id)
    if(!widget) {
      throw new Error(`Widget with id: ${id} not found`);
    }
    return widget;
}

export const getTodoItem = (todoList: TodoItem[], todoId: string) => {
    const todo = todoList.find(todoItem => todoItem.id === todoId)
    if(!todo) {
        throw new Error(`Todo with id: ${todoId} not found`);
    }
    return todo;
}

export const getInProgressTodos = (todoList: TodoItem[]) => {
    return todoList.filter(todoItem => !todoItem.completed)
}

export const getCompletedTodos = (todoList: TodoItem[]) => {
    return todoList.filter(todoItem => todoItem.completed);
}

export const useTodo = (widgets: DashboardWidget[], widgetId: string, todoId: string) => {
    const widget = getWidget(widgets, widgetId);
    if(widget.type !== "todo") {
        throw new Error(`widgetId (${widgetId}) must refer to a widget of type TodoWidget`)
    }
    return getTodoItem(widget.todos, todoId);
}

export const getTodoDisplayOrder = (todos: TodoItem[]) => {
    const todosWithNoDate = todos.filter(todo => !todo.due && !todo.completed);
    const todosOrderedWithDate = todos.filter(todo => todo.due && !todo.completed).sort((a, b) => compareAsc(a.due!, b.due!));
    return [...todosWithNoDate, ...todosOrderedWithDate];
}

export const getWeatherIcon = (code: number) => {
    if(code === 0) return Sun;
    if(code === 1) return CloudSun;
    if(code === 2 || code === 3) return Cloud;
    if(code === 45 || code === 48) return CloudFog;
    if(code >= 51 && code <= 57) return CloudDrizzle;
    if((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return CloudRain;
    if((code >= 71 && code <= 77) || code === 85 || code === 86) return Snowflake;
    if(code >= 95 && code <= 99) return CloudLightning;
    return Sun;
}

export const getWeatherDescription = (code: number) => {
    if(code === 0) return "Clear Sky";
    if(code === 1) return "Partly Cloudy";
    if(code === 2 || code === 3) return "Cloudy";
    if(code === 45 || code === 48) return "Foggy";
    if(code >= 51 && code <= 57) return "Drizzling";
    if((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "Raining";
    if((code >= 71 && code <= 77) || code === 85 || code === 86) return "Snowing";
    if(code >= 95 && code <= 99) return "Thunderstorm";
    return undefined;
}