import { useParams } from "react-router";

const TodoBody = () => {
    const {todoId} = useParams();
    return <h1>{todoId}</h1>
}

export default TodoBody;