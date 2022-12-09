import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
//takes in data as a parameter
export default function uc1line ({data}) {
    //store all scenarios
    let scenarios = [...new Set(data.map(item => item.scenario_id))];
    //for each scenario **TO REMOVE SINCE ONLY ONE SCENARIO DATA WILL BE GIVEN**
    scenarios.forEach(scenario => {
        //get data for that scenario
        let scenarioData = data.filter(data => data.scenario_id == scenario);
        //store dates
        let dates = [];
        //store hours
        let hours = [];
        //store lmps for each date
        let lmps = [];
        //add each date and hour to datesAndHours for x axis
        scenarioData.forEach(data => {
            //if the node has data for that date and hour
            if (data.date + " " + data.hour == dateAndHour) {
                //add the lmp to the lmp array
                lmp.push(data.lmp);
            }
        });
        //add the average of lmp array to the lmps array
        lmps.push(lmp.reduce((a, b) => a + b, 0) / lmp.length);
    });
    //add the lmps array to the scenarioLMPs array
    scenarioLMPs.push(lmps);
    console.log(scenarioLMPs);
    //create trace for scenario 1 with datesAndHours as x and scenarioLMPs as y values
    let trace1 = {
        x: datesAndHours,
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