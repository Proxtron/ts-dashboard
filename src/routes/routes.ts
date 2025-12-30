import Body from "@/routes/Body";
import { createBrowserRouter } from "react-router";
import TodoBody from "./TodoBody";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Body,
    }, 
    {
        path: "/todos/:todoId",
        Component: TodoBody
    }
])

export default router