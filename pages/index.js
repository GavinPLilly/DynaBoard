import React from 'react'
import styles from '../styles/index.module.css'
import Image from 'next/image'
import Head from 'next/head'
import Header from '../Components/Header'

function index() {
  return (
    <>
      <Head>
        <title>DynaBoard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={styles['container']}>
        <Header />
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
