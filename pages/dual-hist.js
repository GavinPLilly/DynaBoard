import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

//takes in data as a parameter and returns two density histograms as subplots
export default function dualHist () {
    //fetch node data from api
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/GET/node-data')
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    }
    , []);
    //create density histograms for each scenario
    let scenarios = [...new Set(data.map(item => item.scenario_id))];
    let lmps = [];
    let counts = [];
    scenarios.forEach(scenario => {
        let scenarioData = data.filter(data => data.scenario_id == scenario);
        let averageLMPs = [];
        let count = 0;
        scenarioData.forEach(data => {
            averageLMPs.push(data.lmp);
            count++;
        });
        counts.push(count);
        lmps.push(averageLMPs);
    });
    //calculate bin size
    let binSize = Math.ceil(Math.sqrt(counts[0]));
    //create density histogram for first scenario with bins betwwen 25 and 35
    let hist1 = {
        x: lmps[0],
        type: 'histogram',
        histnorm: 'probability',
        name: 'Scenario 1',
    };
    //create density histogram for second scenario with evenly sized bins between 25 and 35
    let hist2 = {
        x: lmps[1],
        type: 'histogram',
        histnorm: 'probability',
        name: 'Scenario 2',
    };

    //stack hist1 and hist2 on top of each other
    let plotData = [hist1, hist2];
    return (
        <Plot
            data={plotData}
            layout={{
                grid: {rows: 2, columns: 1, pattern: 'independent', roworder: 'top to bottom'},
                yaxis1: {title: {text: 'Density'}}, yaxis2: {title: {text: 'Density'}},
                xaxis: {title: {text: 'LMP'}},width: 600, height: 600, title: 'Density Histograms', font: {
                family: 'Courier New, monospace',
                size: 15,
                color: '#7f7f7f'
            },
            //reduce legend size
            legend: {
                font: {
                    size: 10
                }
            }
        }}
        />
    );  
}