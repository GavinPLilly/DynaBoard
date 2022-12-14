import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function bar({data}) {

  let hours = [];
  let averageLMPs = [];
  //log the scenario ids
  let scenarios = [...new Set(data.map(item => item.scenario_id))];
  console.log(scenarios);
  data.forEach(data => {
    if (!hours.includes(data.hour)) {
      hours.push(data.hour);
    }
  });
  hours.sort();
  hours.forEach(hour => {
    let sum = 0;
    let count = 0;
    data.forEach(data => {
      if (data.hour == hour) {
        sum += data.lmp;
        count++;
      }
    });
    averageLMPs.push(sum / count);
  });
  //minimum lmp value
  let min = Math.min(...averageLMPs);
  //maximum lmp value
  let max = Math.max(...averageLMPs);
  //setHours(hours);
  //setAverageLMPs(averageLMPs);


  return (
    <>
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
          yaxis: { title: { text: 'LMP' }, range: [min, max] }, 
          xaxis: { title: { text: 'Time' } }, 
          width: 600, height: 600, title: 'Average LMP over a 24hr period', font: {
            family: 'Courier New, monospace',
            size: 16,
            color: 'black'
          }, paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        }}
      />
    </>

  );
}
