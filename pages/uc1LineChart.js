import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
//takes in data as a parameter
export default function uc1line ({data}) {
    let dateAndHour = []; //store date and hour
    //store lmps for each date
    let lmps = [];
    //add each date and hour to datesAndHours for x axis
    data.forEach(data => {
        if (!dateAndHour.includes(data.date + ' ' + data.hour)) {
            dateAndHour.push(data.date + ' ' + data.hour);
        }
    });
    //for each date
    dateAndHour.forEach(date => {
        let lmp = [];
        //for each node
        data.forEach(data => {
            //if the node has data for that date
            if (data.date + ' ' + data.hour == date) {
                //add the lmp to the lmp array
                lmp.push(data.lmp);
            }
        });
        //add the average of lmp array to the lmps array
        lmps.push(lmp.reduce((a, b) => a + b, 0) / lmp.length);
    });
    console.log(lmps);
    //create trace for scenario 1 with datesAndHours as x and scenarioLMPs as y values
    let trace1 = {
        x: dateAndHour,
        //store y values scenario 1 for each date and hour as int
        y: lmps,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
        name: 'Scenario 1'
    };
    //plot trace1
    let plotData = [trace1];
    let layout = {
        title: 'Scenario 1',
        xaxis: {
            title: 'Date and Hour',
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
            data={plotData}
            layout={layout}
        />
    );
    }