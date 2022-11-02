import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import profilePic from '../public/dyna.jpeg'
import Link from 'next/link';


import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {Bar, Bubble} from 'react-chartjs-2';



const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
    datasets: [
      {
        label: 'BASE CASE',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 0.4)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(54, 162, 235, 0.4)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(54, 162, 235, 0.4)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06, 30.06]
      },
      {
        label: 'CASE A',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 0.4)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255, 99, 132, 0.4)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        pointHoverBorderColor: 'rgba(255, 99, 132, 0.4)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [30.06, 30.11, 30.16, 30.21, 30.26, 30.31, 30.36, 30.41, 30.46, 30.51, 30.56, 30.61, 30.66, 30.71, 30.76, 30.81, 30.86, 30.91, 30.96, 31.01, 31.06, 31.11, 31.16, 31.21]
      },
      {
        label: 'CASE B',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(35, 143, 41, 0.4)',
        borderColor: 'rgba(35, 143, 41, 0.4)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(35, 143, 41, 0.4)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(35, 143, 41, 0.4)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [30.06, 30.01, 29.96, 29.91, 29.86, 29.81, 29.76, 29.71, 29.66, 29.61, 29.56, 29.51, 29.46, 29.41, 29.36, 29.31, 29.26, 29.21, 29.16, 29.11, 29.06, 29.01, 28.96, 28.91]
      }
    ]
  }
  

  const data1 = {
    labels: ['January'],
    datasets: [
      {
        label: 'Location',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255, 206, 86, 0.4)',
        borderColor: 'rgba(255, 206, 86, 0.4)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255, 206, 86, 0.2)',
        pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 206, 86, 0.2)',
        pointHoverBorderColor: 'rgba(255, 206, 86, 0.2)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [{x:5,y:1,r:3},{x:10,y:40,r:3},{x:10,y:20,r:5}, {x:15,y:30,r:10}, {x:20,y:40,r:5}]
      }
    ]
  };
  
  const data2 = {
    labels: ['Base Case', 'Scenario A', 'Scenario B', 'Scenario C', 'Scenario D', 'Scenario E'],
    datasets: [{
      label: 'LMP',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',   
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  }

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
    <Bar
      data={data2}
      width={400}
      height={190}
    />
</div>
  
  <div class={styles.columnsmall}>
      <div class = {styles.rowsmall}>
    
    <Line
      data={data}
      width={400}
      height={175}
    />


  </div>
  <div class = {styles.rowsmall2}>
    <Bubble
      data={data1}
      width={400}
      height={150}
    />
  </div>
</div>
</div>
</div>
)}
