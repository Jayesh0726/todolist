"use client"
import React, {useState, useEffect} from 'react'
import { TodoProvider } from './context'
import { TodoForm, TodoList } from './components';

function page() {
const [todos, setTodos] = useState([]);

const addTodo = (todo)=>{
    setTodos((prevTodo)=> [...prevTodo, {id: Date.now(), ...todo}])
}
const updateTodo = (id, todo)=> {
  setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo)))
}
const deleteTodo = (id) => {
  setTodos((prev)=> prev.filter((todo)=> (todo.id !== id)))
}
const toggleCompleted = (id) => {
  setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed}: prevTodo))
}

useEffect(()=>{
  const todos = JSON.parse(localStorage.getItem("todos"))
  if(todos && todos.length > 0){
    setTodos(todos);
  }
},[])
useEffect(()=>{
localStorage.setItem("todos", JSON.stringify(todos));
},[todos])
 
  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleCompleted}}>
    <div>
      <h1 className='bg-black p-5 text-white text-5xl font-bold text-center mb-8'>Todo List</h1>
      <div className="mb-4">
        {/* Todo form goes here */} 
        <TodoForm />
      </div>
      <div className='px-8 pt-10 bg-slate-300 flex flex-wrap gap-y-3'>
        <ul>
          {todos.length > 0 ? (todos.map((todo)=>(
            <li key={todo.id}
            className='w-full mb-8 mx-8'>
                <TodoList todo={todo} />
            </li>
          ))
          ) : (<p className='text-white font-extrabold text-xl px-8 mb-8'>No task is available to do, please add the task!</p>
          )}
        </ul>
      </div>
    </div>
    </TodoProvider>
  )
}

export default page
