import { useState, type FormEvent } from "react"

const ToDoList = () => {

    // items types
    interface ToDoListItem {
        content: string;
        id: string;
        editing: boolean;
    }

    // Hooks
    const [todo, setTodo] = useState<ToDoListItem[]>([]); // for use todo list items
    const [newItem, setNewItem] = useState<string>(""); // save item by user from input
    const [newEditedItem, setNewEditedItem] = useState<string>(""); // save item edited by user from edit input

    // Form submit handle, add new item to the todo list
    function handleSubmit(e: FormEvent, isMainInput = true) {
        // reset the input to the default
        if (isMainInput)
            e.preventDefault()

        // set new item to the list
        setTodo((currentItem) => {
            return [
                ...currentItem,
                {
                    content: newItem,
                    id: crypto.randomUUID(),
                    editing: false
                }
            ]
        })

        // set new item variable to nothing
        if (isMainInput)
            setNewItem("")
    }
    // get and add the new item from input
    function updateItemHandle(e: React.ChangeEvent<HTMLInputElement>) {
        setNewItem(e.target.value)
    }

    // get and add the edited item from input
    function handleEditedItem(e: React.ChangeEvent<HTMLInputElement>) {
        setNewEditedItem(e.target.value)
    }

    // delete the item from list
    function handleDelete(id: string) {
        setTodo((currentItem) => {
            return currentItem.filter(item => item.id !== id)
        })
    }

    // edit the item
    function handleEdit(id: string, event: any) {
        setTodo((currentItem) => {
            return currentItem.map(item => {
                if (item.id === id) {
                    if (item.editing) {
                        event.target.innerHTML = "&#9998;";

                        return {
                            ...item,
                            content: newEditedItem,
                            editing: false
                        }
                    }

                    setNewEditedItem(item.content)
                    event.target.innerHTML = "&#10004;";
                    return {
                        ...item,
                        editing: true
                    }
                }

                return item
            })
        })
    }

    // main return for the html base
    return (
        <>
            <h1 className="text-center mb-4">Todo list</h1>

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card">

                        <div className="card-body">
                            {/* Add item to the ToDo list - form */}
                            <form id="todo-form" onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control"
                                        id="todo-input"
                                        placeholder="Add new task"
                                        required
                                        onChange={updateItemHandle}
                                        value={newItem}
                                    />
                                    <button className="btn btn-primary" type="submit">
                                        Add
                                    </button>
                                </div>
                            </form>

                            {/* ToDo list items */}
                            <ul className="list-group" id="todo-list">
                                {todo.map(item => {
                                    return (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span className="task-text" hidden={item.editing}>{item.content}</span>
                                            <input type="text" className="form-control edit-input" hidden={!item.editing} value={newEditedItem} onChange={handleEditedItem} />
                                            <div className="btn-group">
                                                <button className="btn btn-danger btn-sm delete-btn" onClick={() => handleDelete(item.id)}>&#x2715;</button>
                                                <button className="btn btn-primary btn-sm edit-btn" onClick={(e) => handleEdit(item.id, e)}>&#9998;</button>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>

                    </div>

                </div>

            </div >
        </>
    )
}

export default ToDoList