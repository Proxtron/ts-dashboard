import type { Dispatch } from "react";
import type { DashboardWidget, WidgetActions } from "./Widget";

//Contexts 
export interface AppContextType {
    widgets: DashboardWidget[]
    widgetsDispatch: Dispatch<WidgetActions>
}