import type { DashboardWidget, WidgetType } from "./Widget";

//Contexts 
export interface AppContext {
    widgets: DashboardWidget[]
    addWidget: (type: WidgetType) => void,
    removeWidget: (widgetId: number) => void,
    updateWidgetState: (widgetId: number, next: DashboardWidget) => void
}