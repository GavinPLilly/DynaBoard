import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function line () {
  //fetch data from api and set to data
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/GET/node-data')
      .then(response => response.json())
      .then(
        data => setData(data));
  }, []);
  //create traces for each scenario
  let traces = [];
  let scenarios = [...new Set(data.map(item => item.scenario_id))];
  scenarios.forEach(scenario => {
    let scenarioData = data.filter(data => data.scenario_id == scenario);
    let hours = [];
    let averageLMPs = [];
    scenarioData.forEach(data => {
      if (!hours.includes(data.hour)) {
        hours.push(data.hour);
      }
    });
    hours.forEach(hour => {
      let sum = 0;
      let count = 0;
      scenarioData.forEach(data => {
        if (data.hour == hour) {
          sum += data.lmp;
          count++;
        }
      });
      averageLMPs.push(sum / count);
    });
    traces.push({
      x: hours,
      y: averageLMPs,
      type: 'line',
      name: scenario
    });
  });
  
  return (
    <Plot
      data={traces}
      layout={{yaxis: {title: {text: 'LMP'}}, xaxis: {title: {text: 'Time'}},width: 600, height: 600, title: 'Average LMP over Time', font: {
        family: 'Courier New, monospace',
        size: 16,
        color: 'black'
      }, paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)'
  }}
    />
  );
}
