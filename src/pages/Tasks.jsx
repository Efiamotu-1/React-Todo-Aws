import React, { useState } from 'react'
import TaskList from '../components/TaskList'

function Tasks() {
    const [tasks, setTasks] = useState([])
    const [inputValue, setInputValue] = useState({})
  
    const handleInput = (e) => {
      if(e.target.name === "task") {
        setInputValue(state => ({...state, [e.target.name]: e.target.value}))
      }
    }
  
    const submitTask = () => {
      if(inputValue.task){
        setTasks(state => [...state, inputValue.task])
        console.log(inputValue.task)
        setInputValue(state => ({...state, task: ""}))
      }
    }
  
    return (
      <>
   
      <div>Today's Todo Tasks</div>
        <input type="text" name="task" placeholder='Add a new Task' onChange={handleInput} value={inputValue.task ? inputValue.task : ""}/>
        {/* <input type="text" name="event" placeholder='Add a new Event' onChange={handleInput} value={inputValue["event"]}/> */}
        <button onClick={submitTask}>Add Task</button>
        <TaskList tasks={tasks}/>
      </>
    )
}

export default Tasks