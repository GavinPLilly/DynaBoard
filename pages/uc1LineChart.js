import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
//takes in data as a parameter
export default function uc1line ({data}) {
    let dates = []; //store date
    //store lmps for each date
    let lmps = [];
    //add each date to dates for x axis
    data.forEach(data => {
        if (!dates.includes(data.date)) {
            dates.push(data.date);
        }
    });
    //sort dateAndHour and store it in dateAndHour
    dates.sort();
    //for each date
    dates.forEach(date => {
        let dtc = [];
        //for each node
        data.forEach(data => {
            //if the node has data for that date
            if (data.date == date) {
                //add the lmp to the lmp array
                dtc.push(data.lmp);
            }
        });
        //add the average of lmp array to the lmps array
        lmps.push(dtc.reduce((a, b) => a + b, 0) / dtc.length);
    });
    console.log(lmps);
    //create trace for scenario 1 with datesAndHours as x and scenarioLMPs as y values
    let trace1 = {
        x: dates,
        //store y values scenario 1 for each date and hour as int
        y: lmps,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
        name: 'LMP over Time'
    };
    //plot trace1
    let plotData = [trace1];
    let layout = {
        title: 'LMP over Time',
        xaxis: {
            title: 'Date',
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: 'LMP ($/MWh)',
            showline: false,
        },
        width: 700,
        height: 600
    };
    return (
        <Plot
            data={[trace1]}
            layout={layout}
        />
    );
    }