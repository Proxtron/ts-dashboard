import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import { useReducer, useState } from "react"
import { AppContext } from "./context/AppContext"
import { type DashboardWidget, type WidgetSize, type WidgetType } from "./types/Widget"
import type { AppContextType } from "./types/Context"
import { DndContext } from "@dnd-kit/core"
import type { UniqueIdentifier } from "@dnd-kit/core/dist/types"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import { RouterProvider } from "react-router"
import router from "./routes/routes"
import type { WidgetActions } from "./types/Widget"
import { v4 } from "uuid"

function App() {
  // const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

  const [widgets, widgetsDispatch] = useReducer(reducer, []);

  // const moveWidget = (deltaX: number, deltaY: number, id: UniqueIdentifier) => {
  //   const newWidgets = widgets.map((widget) => {
  //     if (widget.id === id) {
  //       return {
  //         ...widget,
  //         x: widget.x + deltaX,
  //         y: widget.y + deltaY
  //       }
  //     } else {
  //       return widget;
  //     }
  //   });

  //   setWidgets(newWidgets);
  // }

  const appContext: AppContextType = {
    widgets: widgets,
    widgetsDispatch: widgetsDispatch
  }

  return (
    <DndContext onDragEnd={(event) => {
      widgetsDispatch({
        type: "move",
        deltaX: event.delta.x,
        deltaY: event.delta.y,
        widgetId: event.active.id as string
      });
    }} modifiers={[restrictToParentElement]}>
      <AppContext.Provider value={appContext}>
        <Grid backgroundColor="bg.canvas" minH="100vh" templateRows="1fr 8fr" templateColumns="1fr 5fr" >
          <GridItem gridRow="1 / 4" gridColumn="1 / 2" borderRightWidth="1px" borderColor="gray.500">
            <Sidebar />
          </GridItem>
          <GridItem borderBottomWidth="1px" borderColor="gray.500">
            <Header />
          </GridItem>
          <GridItem>
            <RouterProvider router={router} />
          </GridItem>
        </Grid>
      </AppContext.Provider>
    </DndContext>
  );
}

const reducer = (oldState: DashboardWidget[], action: WidgetActions) => {
  let newState: DashboardWidget[];
  switch (action.type) {
    case "add":
      let newWidget: DashboardWidget;

      if (action.widgetType === "notes") {
        newWidget = {
          id: v4(),
          type: action.widgetType,
          notes: [],
          size: action.size,
          x: 0,
          y: 0
        }
      } else if (action.widgetType === "todo") {
        newWidget = {
          id: v4(),
          type: action.widgetType,
          todos: [],
          size: action.size,
          x: 0,
          y: 0
        }
      } else {
        newWidget = {
          id: v4(),
          type: action.widgetType,
          forecast: [],
          size: action.size,
          x: 0,
          y: 0
        }
      }

      newState = [
        ...oldState,
        newWidget
      ];
      break;
    case "move":
      newState = oldState.map(widget => {
      if (widget.id === action.widgetId) {
        return {
          ...widget,
          x: widget.x + action.deltaX,
          y: widget.y + action.deltaY
        }
        } else {
          return widget;
        }
      });
  }

  return newState;
}

export default App;