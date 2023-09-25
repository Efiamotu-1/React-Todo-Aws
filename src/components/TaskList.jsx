import React from 'react'
import Task from './Task'

export default function TaskList({tasks}) {
  return (
    <div>
        {tasks.map((task,i) => <Task task={task} key={i}/>)}
    </div>
  )
}
