import React, { useState } from 'react'
import TaskList from '../components/TaskList'
import Button from '../components/Button'
import styles from './Tasks.module.css'
import { useAuth } from '../contexts/AuthContext'
import { API, graphqlOperation } from 'aws-amplify'
import { createTask } from '../graphql/mutations'
import { listTasks } from '../graphql/queries'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function Tasks() {
    const {user, logout} = useAuth()
    const [inputValue, setInputValue] = useState({})
    
    const queryClient = useQueryClient()
    const handleInput = (e) => {
      if(e.target.name === "task") {
        setInputValue(state => ({...state, [e.target.name]: e.target.value}))
      }
    }
    const getTasks = async() => {
      try{
        const taskData = await API.graphql(graphqlOperation(listTasks))
        const tasks = taskData.data.listTasks.items
        return tasks
      }catch(err) {
        console.error(err.message)
      }
    }
    const {isLoading, data: tasks} = useQuery({
      queryKey: ['task'],
      queryFn: () => getTasks()
    })

const handleLogout = () => {
  queryClient.removeQueries({
    queryKey: ['task']
  })
  logout()
}

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
          if(inputValue.task){
            const newTask = {
              content: inputValue.task
            }
            const result = await API.graphql(graphqlOperation(createTask, {input: newTask}))
            setInputValue({...inputValue, task: ""})
            return result
          }
        }catch(err) {
          console.error(err.message)
        }
    }
  
    const {mutate, isLoading: isCreatingTask} = useMutation({
      mutationFn: (e) => handleSubmit(e),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['task']
        })
      },
      onError: (err) => {
        console.error(err.message)
      }

    })
    return (
      <div className={styles.page}>
        <Button type="primary" onClick={handleLogout}>Logout</Button>
      <div className={styles.container}>
        <h1>{user.username} Welcome To Today's Todo Tasks</h1>
        <form onSubmit={mutate} className={styles.form}>

        <input type="text" name="task" placeholder='Add a new Task' onChange={handleInput} value={inputValue.task ? inputValue.task : ""}/>
        <Button type="primary" disabled={isCreatingTask}>Add Task</Button>
        </form>
        {isLoading ? <p>Loading Tasks...</p> : <TaskList tasks={tasks}/>}
      </div>
      </div>
    )
}

export default Tasks