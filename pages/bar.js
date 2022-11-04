import React from "react";
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
// import Plot from 'react-plotly.js'

export default function bar () {
  return (
    <Plot
      data={[
      {
        x:  ['01', '02', '03', '04', '05', '06', '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
        y: [30.06, 30.01, 29.96, 29.91, 29.86, 29.81, 29.76, 29.71, 29.66, 29.61, 29.56, 29.51, 29.46, 29.41, 29.36, 29.31, 29.26, 29.21, 29.16, 29.11, 29.06, 29.01, 28.96, 28.91],
        type: 'bar',
        name: 'Case B',
      },
    ]}
    layout={{yaxis: {range: [28,30.06], title: {text: 'LMP'}}, xaxis: {title: {text: 'Time'}}, width: 600, height: 600, title: '.Z.NORTH, LMP over Time', font: {
      family: 'Courier New, monospace',
      size: 16,
      color: 'white'
    }, paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
}}
    />
  );
}
