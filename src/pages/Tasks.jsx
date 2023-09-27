import React, { useState } from 'react'
import TaskList from '../components/TaskList'
import Button from '../components/Button'
import styles from './Tasks.module.css'
import { useAuth } from '../contexts/AuthContext'

function Tasks() {
    const {user, logout} = useAuth()
    const [tasks, setTasks] = useState([])
    const [inputValue, setInputValue] = useState({})
  
    const handleInput = (e) => {
      if(e.target.name === "task") {
        setInputValue(state => ({...state, [e.target.name]: e.target.value}))
      }
    }
  
    const handleSubmit = (e) => {
        e.preventDefault()
      if(inputValue.task){
        setTasks(state => [...state, inputValue.task])
        console.log(inputValue.task)
        setInputValue(state => ({...state, task: ""}))
      }
    }
  
    return (
      <div className={styles.page}>
        <Button type="primary" onClick={() => logout()}>Logout</Button>
      <div className={styles.container}>
        <h1>{user.username} Welcome To Today's Todo Tasks</h1>
        <form onSubmit={handleSubmit} className={styles.form}>

        <input type="text" name="task" placeholder='Add a new Task' onChange={handleInput} value={inputValue.task ? inputValue.task : ""}/>
        <Button type="primary">Add Task</Button>
        </form>
        <TaskList tasks={tasks}/>
      </div>
      </div>
    )
}

export default Tasks