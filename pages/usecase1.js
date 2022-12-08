import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import React from 'react';

  const BarGraph = dynamic(import('./bar'), {ssr:false})
  const HeatMap = dynamic(import('./heat'), {ssr:false})
  const SingleScenarioLineGraph = dynamic(import('./uc1LineChart'), {ssr:false})
export default function use1() {
  return (
    <div>
      <div className={styles.topnav}>
        <h3 className={styles.topnavimg}>
        <Image src="/favicon.ico" width={40} height={40} /> 
        </h3>
          Reliable Electricity. Competitive Prices. Clean-Energy Transition.
      </div>
      <div className = {styles.row}>
        <div className ={styles.firstcolumn}>
          <BarGraph />
        </div>
        <div className ={styles.firstcolumn}>
          <SingleScenarioLineGraph />
        </div>
        <div className ={styles.column2}>
          <HeatMap />
        </div>
      </div>
    </div>
)}
