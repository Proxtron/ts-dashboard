import type { DashboardWidget, WidgetSize, WidgetType } from "./Widget";

//Contexts 
export interface AppContextType {
    widgets: DashboardWidget[]
    addWidget: (type: WidgetType, size: WidgetSize) => void,
    // removeWidget: (widgetId: number) => void,
    // updateWidgetState: (widgetId: number, next: DashboardWidget) => void
}