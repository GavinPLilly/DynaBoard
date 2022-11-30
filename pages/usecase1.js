import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import profilePic from '../public/dyna.jpeg'
import Link from 'next/link';
import dynamic from 'next/dynamic';

import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {Bar, Bubble} from 'react-chartjs-2';

  const LineGraph = dynamic(import('./line'), {ssr:false})
  const BarGraph = dynamic(import('./bar'), {ssr:false})
  const HeatMap = dynamic(import('./heat'), {ssr:false})
  const ScatterPlot = dynamic(import('./scatterplot'), {ssr:false})
export default function use2() {
  return (
    <div>
      <div className={styles.topnav}>
        <h3 className={styles.topnavimg}>
        <Image src="/favicon.ico" width={40} height={40} /> 
        </h3>
          Reliable Electricity. Competitive Prices. Clean-Energy Transition.
      </div>
      <div>
        <div class={styles.columnbig}>
        <BarGraph />
      </div>
      <div class={styles.columnsmall}>
        <div class = {styles.rowsmall}>
        <LineGraph />
  </div>
  <div class = {styles.rowsmall}>
    <HeatMap />
  </div>
  <div class = {styles.rowsmall2}>
    <ScatterPlot />
  </div>
</div>
</div>
</div>
)}
