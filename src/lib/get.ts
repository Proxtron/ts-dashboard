import type { DashboardWidget, TodoItem } from "@/types/Widget";

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

export const useTodo = (widgets: DashboardWidget[], widgetId: string, todoId: string) => {
    const widget = getWidget(widgets, widgetId);
    if(widget.type !== "todo") {
        throw new Error(`widgetId (${widgetId}) must refer to a widget of type TodoWidget`)
    }
    return getTodoItem(widget.todos, todoId);
}