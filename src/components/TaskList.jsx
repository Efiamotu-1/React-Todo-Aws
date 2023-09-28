import React from 'react'
import Task from './Task'
import styles from '../pages/Tasks.module.css'


export default function TaskList({tasks}) {
  if(tasks.length === 0) return <p className={styles.notask}>You currently have no task, kindly add a new task</p>
  return (
    <div>
        {tasks.map((task,i) => <Task task={task} key={task.id}/>)}
    </div>
  )
}
