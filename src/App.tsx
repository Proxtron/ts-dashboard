import { Grid, GridItem } from "@chakra-ui/react"
import Header from "./components/layout/Header"
import { useReducer} from "react"
import { AppContext } from "./context/AppContext"
import { type DashboardWidget} from "./types/Widget"
import type { AppContextType } from "./types/Context"
import { DndContext } from "@dnd-kit/core"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import { RouterProvider } from "react-router"
import router from "./routes/routes"
import type { WidgetActions } from "./types/Widget"
import { v4 } from "uuid"
import SpinnerOverlayManager from "./components/ui/SpinnerOverlay"
import { Toaster } from "./components/ui/toaster"
function App() {
  const [widgets, widgetsDispatch] = useReducer(reducer, []);


  const appContext: AppContextType = {
    widgets: widgets,
    widgetsDispatch: widgetsDispatch,
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
        <SpinnerOverlayManager.Viewport/>
          <Toaster/>
          <Grid backgroundColor="bg.canvas" minH="100vh" templateRows="1fr 10fr">
            <GridItem borderBottomWidth="1px" borderColor="border.default">
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

      if (action.widgetType === "todo") {
        newWidget = {
          id: v4(),
          type: action.widgetType,
          todos: [],
          x: 0,
          y: 0
        }
      } else {
        newWidget = {
          id: v4(),
          type: action.widgetType,
          x: 0,
          y: 0,
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
      break;
    case "toggleTodo":
      newState = oldState.map((widget) => {
        if(widget.id === action.widgetId && widget.type === "todo") {
          return {
            ...widget,
            todos: widget.todos.map((todo) => {
              if(todo.id === action.todoId) {
                return {
                  ...todo,
                  completed: !todo.completed
                }
              }
              return todo;
            })
          }
        }
        return widget;
      })
      break;
    case "addTodo":
      newState = oldState.map((widget) => {
        if(widget.id === action.widgetId && widget.type === "todo") {
          return {
            ...widget,
            todos: [
              ...widget.todos,
              action.newTodoItem
            ]
          }
        }
        return widget;
      });
      break;
    case "editTodo":
      newState = oldState.map((widget) => {
        if(widget.id === action.widgetId && widget.type === "todo") {
          const newTodos = widget.todos.map((todo) => {
            if(todo.id === action.todoId) {
              return {
                id: action.todoId,
                ...action.newTodoAttributes
              }
            }
            return todo
          })  
          return {
            ...widget,
            todos: newTodos
          }
        }
        return widget;
      })
      break;
    case "deleteTodo":
      newState = oldState.map((widget) => {
        if(widget.id === action.widgetId && widget.type === "todo") {
          const newTodos = widget.todos.filter(todo => todo.id !== action.removingTodoId)
          return {
            ...widget,
            todos: newTodos
          }
        }
        return widget;
      })
      break;
    case "changeLocation":
      newState = oldState.map((widget) => {
        if(widget.id === action.widgetId && widget.type === "weather") {
          return {
            ...widget,

          }
        } 
        return widget;
      })
      break;
  }

  return newState;
}

export default App;