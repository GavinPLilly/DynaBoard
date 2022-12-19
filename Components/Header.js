import React from 'react'
import styles from '../styles/header.module.css'
import Image from 'next/image'

function Header() {
    return (
        <>
            <div className={styles['header']}>
                <a href="./.."><Image src="/logo.svg" alt="logo" width={100} height={100} /></a>
                <p className={styles['header-description']}>Reliable Electricity | Competitive Prices | Clean-Energy Transition</p>
            </div>
        </>
    )
}

export default Header