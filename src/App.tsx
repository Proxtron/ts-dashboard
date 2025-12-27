import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import Body from "./components/layout/Body"
import { useState } from "react"
import { AppContext } from "./context/AppContext"
import { type DashboardWidget, type WidgetSize, type WidgetType } from "./types/Widget"
import type { AppContextType } from "./types/Context"
import { DndContext } from "@dnd-kit/core"
import type { UniqueIdentifier } from "@dnd-kit/core/dist/types"
import { restrictToParentElement } from "@dnd-kit/modifiers"

function App() {
  const [nextId, setNextId] = useState(1);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);


  const addWidget = (type: WidgetType, size: WidgetSize) => {
    let newWidget: DashboardWidget;

    if (type === "notes") {
      newWidget = {
        id: nextId,
        type: type,
        notes: [],
        size: size,
        x: 0,
        y: 0
      }
    } else if (type === "todo") {
      newWidget = {
        id: nextId,
        type: type,
        todos: [],
        size: size,
        x: 0,
        y: 0
      }
    } else {
      newWidget = {
        id: nextId,
        type: type,
        forecast: [],
        size: size,
        x: 0,
        y: 0
      }
    }

    setNextId(nextId + 1);

    setWidgets([
      ...widgets,
      newWidget
    ])
  }

  const moveWidget = (deltaX: number, deltaY: number, id: UniqueIdentifier) => {
    const newWidgets = widgets.map((widget) => {
      if(widget.id === id) {
        return {
          ...widget,
          x: widget.x + deltaX,
          y: widget.y + deltaY
        }
      } else {
        return widget;
      }
    });

    setWidgets(newWidgets);
  }

  const appContext: AppContextType = {
    widgets: widgets,
    addWidget: addWidget
  }

  return (
    <DndContext onDragEnd={(event) => {
      moveWidget(event.delta.x, event.delta.y, event.active.id)}} modifiers={[restrictToParentElement]}>
      <AppContext.Provider value={appContext}>
        <Grid backgroundColor="bg.canvas" minH="100vh" templateRows="1fr 8fr" templateColumns="1fr 5fr" >
          <GridItem gridRow="1 / 4" gridColumn="1 / 2" borderRightWidth="1px" borderColor="gray.500">
            <Sidebar />
          </GridItem>
          <GridItem borderBottomWidth="1px" borderColor="gray.500">
            <Header />
          </GridItem>
          <GridItem>
            <Body />
          </GridItem>
        </Grid>
      </AppContext.Provider>
    </DndContext>
  )
}

export default App
