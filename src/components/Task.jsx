import React, { useState } from 'react'
import styles from '../pages/Tasks.module.css'
import Button from './Button'
import { API, graphqlOperation } from 'aws-amplify'
import { deleteTask, updateTask } from '../graphql/mutations'


export default function Task({task}) {
  const [showEditButton, setShowEditButton] = useState(false)
  const [editValue, setEditValue] = useState("")
  function showEdit() {
    setShowEditButton(state => !state)
  }
  async function handleEdit(taskId) {
    try {
      setShowEditButton(false)
      console.log(editValue)
      const editTask = {
        content: editValue,
        id: taskId
      }
      const result = await API.graphql(graphqlOperation(updateTask, {input: editTask}))
      console.log("success")
      console.log(result)
    }catch(err) {
      console.error(err)
    }

  }
  async function handleDelete(taskId) {
    try {
      const deleteTaskId = {
        id: taskId
      }
      const result = await API.graphql(graphqlOperation(deleteTask, {input: deleteTaskId}))
      console.log(result)
      console.log("delted successfully")
    }catch(err) {
      console.error(err)
    }
  }
  return (
    <>
    <div className={styles.task}> 
    {/* <span><input type="checkbox"/></span> */}
    <span> 
      {task.content}
      </span> 
      <span>
      <Button onClick={() => showEdit()}>Edit</Button>
      <Button onClick={() => handleDelete(task.id)}>Delete</Button>
      </span>
      </div>
      {showEditButton && 
      <>
      <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
      <Button type="primary" onClick={() => handleEdit(task.id)}>Edit Task</Button>
      </>
      }
     
        
    </>
  )
}
