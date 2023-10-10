"use client"
import React from 'react'
import { useState } from 'react';
import { useTodo } from '../context';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const {addTodo} = useTodo();
    const add = (e)=>{
        e.preventDefault();
        if(!todo) return;
        addTodo({todo, completed : false});
        setTodo("");
    }
    return (
        <form onSubmit={add} className='mx-8'>
            <input
                type="text"
                placeholder="Write Todo..."
                className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2 rounded-md"
                value={todo}
                onChange={(e)=> setTodo(e.target.value)}
            />
            <button type="submit" className=" bg-black text-white px-4 py-3 hover:bg-slate-900 text-2xl font-bold mx-8 rounded-md">
                Add Task
            </button>
        </form>
    );
}

export default TodoForm;