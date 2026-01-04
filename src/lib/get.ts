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