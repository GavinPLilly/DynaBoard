import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import React from 'react';
import { useState, useEffect } from 'react';
  const LineGraph = dynamic(import('./line'), {ssr:false})
  const BarGraph = dynamic(import('./bar'), {ssr:false})
  const HeatMap = dynamic(import('./heat'), {ssr:false})
  const ScatterPlot = dynamic(import('./scatterplot'), {ssr:false})
  const SingleScenarioLineGraph = dynamic(import('./uc1LineChart'), {ssr:false})
export default function use2() {
  //fetch node date from api and filter to get only scenario ids
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/GET/node-data')
      .then(response => response.json())
      .then(
        data => setData(data));
  }
    , []);
  let scenarios = [...new Set(data.map(item => item.scenario_id))];
  console.log(scenarios);
  //create dropdown menu to select scenario id
  const [scenario, setScenario] = useState(scenarios[0]);
  const handleChange = (event) => {
    setScenario(event.target.value);
  }

  return (
    <div>
      //create dropdown menu with option to select scenario id
      <div className={styles.dropdown}>
        <select value={scenario} onChange={handleChange}>
          {scenarios.map(scenario_id => (
            <option value={scenario_id}>{scenario_id}</option>
          ))}
        </select>
      </div>
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
          <LineGraph />
        </div>
        </div>
        <div className ={styles.column}>
          <ScatterPlot />
        </div>
        <div className ={styles.column}>
          <SingleScenarioLineGraph scenario={scenario} />
        </div>
        <div className ={styles.column2}>
          <HeatMap />
        </div>
    </div>
)}
