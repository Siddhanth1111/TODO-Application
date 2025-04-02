

export function Todos({todos}){
    
    return <div>
        {todos.map(function(todo){
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button onClick={Toggle} data-id = {todo._id} >{todo.completed == true ? "Completed" : "Mark as Complete"}</button>
            </div>
        })}
    </div>

    function Toggle(e){
        const value = e.target.getAttribute("data-id");
        fetch("http://localhost:3000/completed",{
            method : "put",
            body : JSON.stringify({
                id : value
            }),
            headers : {
                "Content-type" : "application/json"
            }
        }
        )
    }
}