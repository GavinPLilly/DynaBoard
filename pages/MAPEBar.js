import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

//function to create a mean absolute percentage error bar chart from data
export default function MAPEBar ({data}) {
    //calculate average LMPs for each scenario
    let scenarios = [...new Set(data.map(item => item.scenario_id))];
    let lmps = [];
    let dateAndHour = [];
    scenarios.forEach(scenario => {
        let scenarioData = data.filter(data => data.scenario_id == scenario);
        let averageLMPs = [];
        scenarioData.forEach(data => {
            if (!dateAndHour.includes(data.date + ' ' + data.hour)) {
                dateAndHour.push(data.date + ' ' + data.hour);
            }
        });
        dateAndHour.sort();
        dateAndHour.forEach(dateAndHour => {
            let sum = 0;
            let count = 0;
            scenarioData.forEach(data => {
                if (data.date + ' ' + data.hour == dateAndHour) {
                    sum += data.lmp;
                    count++;
                }
            });
            averageLMPs.push(sum / count);
        });
        lmps.push(averageLMPs);
    });
    //calculate mean absolute percentage error between first and second scenario
    let mape = [];
    for (let i = 0; i < dateAndHour.length; i++) {
        mape.push(Math.abs((lmps[0][i] - lmps[1][i]) / lmps[0][i]));
    }
    console.log(dateAndHour);

    return (
        <Plot
            data={[
                {
                    x: dateAndHour,
                    y: mape,
                    type: 'bar',
                    name: 'MAPE'
                }
            ]}
            layout={{yaxis: {title: {text: 'MAPE'}}, xaxis: {title: {text: 'Date and Time'}},width: 600, height: 600, title: 'Mean Absolute Percentage Error', font: {
                family: 'Courier New, monospace',
                size: 16,
                color: 'black'
            }, paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
        }}
        />
    );
    }