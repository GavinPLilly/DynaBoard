import React from 'react'
import styles from '../styles/Title.module.css'

function Title(props) {
    return (
        <>
            <h1 className={styles['title']}>{props.title}</h1>
            <p className={styles['description']}>{props.description}</p>
        </>
    )
}

export default Title