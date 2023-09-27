import React, { useEffect, useState } from 'react'
import TaskList from '../components/TaskList'
import Button from '../components/Button'
import styles from './Tasks.module.css'
import { useAuth } from '../contexts/AuthContext'
import { API, graphqlOperation } from 'aws-amplify'
import { createTask } from '../graphql/mutations'
import { listTasks } from '../graphql/queries'

function Tasks() {
    const {user, logout} = useAuth()
    const [tasks, setTasks] = useState([])
    const [inputValue, setInputValue] = useState({})
    const handleInput = (e) => {
      if(e.target.name === "task") {
        setInputValue(state => ({...state, [e.target.name]: e.target.value}))
      }
    }
    console.log(user)
    const getTasks = async() => {
      try{
        const taskData = await API.graphql(graphqlOperation(listTasks))
        const tasks = taskData.data.listTasks.items
        setTasks(tasks)
      }catch(err) {
        console.error(err)
      }
    }

    useEffect(() => {
      getTasks()
    }, [])
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
          if(inputValue.task){
            const newTask = {
              content: inputValue.task
            }
            const result = await API.graphql(graphqlOperation(createTask, {input: newTask}))
            console.log("success")
            console.log(result)
            console.log(inputValue.task)
            setTasks([...tasks, newTask])

          }
        }catch(err) {
          console.error(err)
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