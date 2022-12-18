import React from 'react'
import styles from '../styles/index.module.css'
import Image from 'next/image'

function index() {
    return (
        <>
            <div className={styles['container']}>
                <div className={styles['header']}>
                    <Image src="/logo.svg" alt="logo" width={100} height={100} />
                    <p className={styles['header-description']}>Reliable Electricity | Competitive Prices | Clean-Energy Transition</p>
                </div>
                <div className={styles['body-container']}>
                    <div className={styles['title']}>
                        DynaBoard
                    </div>
                    <div className={styles['senarios-container']}>
                        <a href="usecase1">
                            <div className={styles['senario']}>
                                <div className={styles['senario-title']}>Analyze</div>
                                <div className={styles['senario-description']}>One Dataset</div>
                            </div>
                        </a>
                        <a href="usecase2">
                        <div className={styles['senario']}>
                            <div className={styles['senario-title']}>Compare</div>
                            <div className={styles['senario-description']}>Two Datasets</div>
                        </div>
                        </a>
                    </div>
                </div>
            </div>


        </>
    )
}

export default index