import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import Body from "./components/layout/Body"
import { useState } from "react"
import { AppContext } from "./context/AppContext"
import { type DashboardWidget, type WidgetSize, type WidgetType } from "./types/Widget"
import type { AppContextType } from "./types/Context"

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
        size: size
      }
    } else if (type === "todo") {
      newWidget = {
        id: nextId,
        type: type,
        todos: [],
        size: size
      }
    } else {
      newWidget = {
        id: nextId,
        type: type,
        forecast: [],
        size: size
      }
    }

    setNextId(nextId + 1);

    setWidgets([
      ...widgets,
      newWidget
    ])
  }

  const appContext: AppContextType = {
    widgets: widgets,
    addWidget: addWidget
  }

  return (
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
  )
}

export default App
