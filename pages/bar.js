import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function bar() {

  const [data, setData] = useState([]);
  const [scenarioID, setScenarioID] = useState('1');
  const [scenarioData, setScenarioData] = useState([]);
  const [hours, setHours] = useState([]); //hours
  const [averageLMPs, setAverageLMPs] = useState([]); //average lmp for each hour

  const [scenarios, setScenarios] = useState([]);


  //when page loads get all data
  useEffect(() => {
    fetch('http://localhost:3000/api/GET/node-data')
      .then(response => response.json())
      .then(
        data => setData(data));
  }, []);

  //when the page loads set scenarios to all unique scenario ids
  useEffect(() => {
    setScenarios([...new Set(data.map(item => item.scenario_id))]);
  }, [data]);

  //when input changes set filtered data to scenarioData and set x and y values
  useEffect(() => {
    setScenarioData(data.filter(data => data.scenario_id == scenarioID));

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

    setHours(hours);
    setAverageLMPs(averageLMPs);

  }, [scenarioID]);


  return (
    <>
      <select onChange={e => setScenarioID(e.target.value)}>
        {scenarios.map(scenario => (
          <option value={scenario}>{scenario}</option>
        ))}</select>

      <Plot
        data={[
          {
            //x: ['01', , '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
            //y: [30.06, 30.01, 29.96, 29.91, 29.86, 29.81, 29.76, 29.71, 29.66, 29.61, 29.56, 29.51, 29.46, 29.41, 29.36, 29.31, 29.26, 29.21, 29.16, 29.11, 29.06, 29.01, 28.96, 28.91],
            x: hours,
            y: averageLMPs,
            type: 'bar',
            name: 'Case B',
          },
        ]}
        layout={{
          yaxis: { range: [28, 30.06], title: { text: 'LMP' } }, xaxis: { title: { text: 'Time' } }, width: 600, height: 600, title: '.Z.NORTH, LMP over Time', font: {
            family: 'Courier New, monospace',
            size: 16,
            color: 'white'
          }, paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        }}
      />
    </>

  );
}
