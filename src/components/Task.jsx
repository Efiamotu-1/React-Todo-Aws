import React, { useState } from 'react'
import styles from '../pages/Tasks.module.css'
import Button from './Button'
import { API, graphqlOperation } from 'aws-amplify'
import { deleteTask, updateTask } from '../graphql/mutations'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function Task({task}) {
  const [showEditButton, setShowEditButton] = useState(false)
  const [editValue, setEditValue] = useState("")
  function showEdit(task) {
    setShowEditButton(state => !state)
    setEditValue(task)
  }
  async function handleEdit(taskId) {
    try {
      setShowEditButton(false)
      const editTask = {
        content: editValue,
        id: taskId
      }
      const result = await API.graphql(graphqlOperation(updateTask, {input: editTask}))
      return result
    }catch(err) {
      console.error(err)
    }

  }
  async function handleDelete(taskId) {
    try {
      const deleteTaskId = {
        id: taskId
      }
    await API.graphql(graphqlOperation(deleteTask, {input: deleteTaskId}))
  
    }catch(err) {
      console.error(err.message)
    }
  }
  const queryClient = useQueryClient()
  const {isLoading: isDeleting, mutate} =useMutation({
    mutationFn: (taskId) => handleDelete(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['task']
      })
    },
    onError: (err) => {
      console.error(err.message)  
    }
  })

  const {mutate : editATask, isLoading: isEditingTask} = useMutation({
    mutationFn: (taskId) => handleEdit(taskId),
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
    <>
    <div className={styles.task}> 
    <span> 
      {task.content}
      </span> 
      <span className={styles.btn}>
      <Button onClick={() => showEdit(task.content)} disabled={isEditingTask} type="primary">Edit</Button>
      <Button onClick={() => mutate(task.id)} disabled={isDeleting} type="primary">Delete</Button>
      </span>
      </div>
      {showEditButton && 
      <>
      <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
      <Button type="primary" onClick={() => editATask(task.id)}>Edit Task</Button>
      </>
      }
     
        
    </>
  )
}
