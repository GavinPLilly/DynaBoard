import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

//takes in data as a parameter and returns two density histograms as subplots
export default function dualHist ({data}) {
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
        name: 'Scenario ' + scenarios[0],
        //set number of bins
        nbinsx: 20
    };
    //create density histogram for second scenario with evenly sized bins between 25 and 35
    let hist2 = {
        x: lmps[1],
        type: 'histogram',
        histnorm: 'probability',
        name: 'Scenario ' + scenarios[1],
    };

    //stack hist1 and hist2 on top of each other
    let plotData = [hist1, hist2];
    return (
        <Plot
            data={plotData}
            layout={{
                grid: {rows: 1, columns: 1, pattern: 'independent', roworder: 'top to bottom'},
                yaxis1: {title: {text: 'Density'}}, yaxis2: {title: {text: 'Density'}},
                xaxis: {title: {text: 'LMP'}},width: 600, height: 600, title: 'Density Histograms', font: {
                    family: 'Courier New, monospace',
                    size: 16,
                    color: 'black'
                  }, paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)'
            }}
        />
    );  
}