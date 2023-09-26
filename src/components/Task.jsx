import React from 'react'
import styles from '../pages/Tasks.module.css'


export default function Task({task, index}) {
  return (
    <div className={styles.task}>{index + 1}. {task}</div>
  )
}
