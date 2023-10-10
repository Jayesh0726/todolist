import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoList({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const {updateTodo, deleteTodo, toggleCompleted} = useTodo();

    const editTodo = ()=>{
        updateTodo(todo.id, {todo: todoMsg, ...todo})
        setIsTodoEditable(false);
    }
    const toggleComplete = ()=>{
        toggleCompleted(todo.id)
    }
    

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-8 py-4 text-2xl font-bold gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ffffff]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer pr-8"
                checked={todo.completed}
                onChange={toggleComplete}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className={`inline-flex py-2 px-4 rounded-lg text-xl text-white border font-bold border-black/10 justify-center items-center ${isTodoEditable ? "bg-green-500" : "bg-yellow-500"} ${isTodoEditable ? "hover:bg-green-600" : "hover:bg-yellow-400"} shrink-0 disabled:opacity-50`}
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁 Save" : "✏️ Edit"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex py-2 px-4 rounded-lg text-xl text-white font-bold border border-black/10 justify-center items-center bg-red-500 hover:bg-red-600 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                🗑 Delete
            </button>
        </div>
    );
}

export default TodoList;
