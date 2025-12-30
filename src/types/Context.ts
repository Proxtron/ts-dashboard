import type { Dispatch } from "react";
import type { DashboardWidget, WidgetActions } from "./Widget";

//Contexts 
export interface AppContextType {
    widgets: DashboardWidget[]
    widgetsDispatch: Dispatch<WidgetActions>
    // addWidget: (type: WidgetType, size: WidgetSize) => void,
    // getWidget: (widgetId: number) => DashboardWidget
    // removeWidget: (widgetId: number) => void,
    // updateWidgetState: (widgetId: number, next: DashboardWidget) => void
}