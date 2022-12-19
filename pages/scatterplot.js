import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function line ({data}) {
    //store lmps of all nodes by hour for each scenario
    let scenarioLMPs = [];
    //store all scenarios
    let scenarios = [...new Set(data.map(item => item.scenario_id))];
    //for each scenario
    scenarios.forEach(scenario => {
        //get data for that scenario
        let scenarioData = data.filter(data => data.scenario_id == scenario);
        //store data and hours
        let dateAndHour = [];
        //store lmps for each hour
        let lmps = [];
        //store all date and hour combinations 
        scenarioData.forEach(data => {
            if (!dateAndHour.includes(data.date + ' ' + data.hour)) {
                dateAndHour.push(data.date + ' ' + data.hour);
            }
        });
        //sort date and hour combinations
        dateAndHour.sort();
        //for each hour
        dateAndHour.forEach(step => {
            //store lmps for that hour
            let lmp = [];
            //for each node
            scenarioData.forEach(data => {
                //if the node has data for that hour
                if (data.date + ' ' + data.hour == step) {
                    //add the lmp to the lmp array
                    lmp.push(data.lmp);
                }
            });
            //add the lmp array to the lmps array
            lmps.push(lmp);
        });
        //add the lmps array to the scenarioLMPs array
        scenarioLMPs.push(lmps);
    });
    //create traces for each hour with scenarioLMPs as x and y values for each hour
    let traces = [];
    let dateAndHour = [];
    let scenarioData = data.filter(data => data.scenario_id == scenarios[0]);
    scenarioData.forEach(data => {
        if (!dateAndHour.includes(data.date + ' ' + data.hour)) {
            dateAndHour.push(data.date + ' ' + data.hour);
        }
    });
    for (let i = 0; i < dateAndHour.length; i++) {
        let trace = {
            x: scenarioLMPs[0][i],
            y: scenarioLMPs[1][i],
            mode: 'markers',
            name: i + 1
        };
        traces.push(trace);
        break;
    }
    //create frames 
    let frames = [];
    for (let i = 0; i < dateAndHour.length; i++) {
        let frame = {
            data: [{
                x: scenarioLMPs[0][i],
                y: scenarioLMPs[1][i],
                mode: 'markers',
                name: i + 1
            }],
            name: i + 1
        };
        frames.push(frame);
    }
    //create slider steps
    let sliderSteps = [];
    dateAndHour.forEach((step, i) => {
        let sliderStep = {
            label: step,
            method: 'animate',
            args: [[i], {
                mode: 'immediate',
                transition: { duration: 30 },
                frame: { duration: 30, redraw: false },
            }]
        };
        sliderSteps.push(sliderStep);
    }
    );

    //create layout
    let layout = {
        title: 'Scatterplot',
        xaxis: {
            title: {
                text: 'Scenario ' + scenarios[0]
            },
            range: [28.5, 31.5]
        },
        yaxis: {
            title: {
                text: 'Scenario ' + scenarios[1]
            },
            range: [28.5, 31.5]
        },
        updatemenus: [{
            x: 0,
            y: 0,
            yanchor: 'top',
            xanchor: 'left',
            showactive: false,
            direction: 'left',
            type: 'buttons',
            pad: { t: 87, r: 10 },
            buttons: [{
                method: 'animate',
                args: [null, {
                    fromcurrent: true,
                    transition: {
                        duration: 30,
                        easing: 'quadratic-in-out'
                    },
                    frame: {
                        duration: 50,
                        redraw: false
                    }
                }],
                label: 'Play'
            }, {
                method: 'animate',
                args: [
                    [null],
                    {
                        mode: 'immediate',
                        transition: { duration: 0 },
                        frame: { duration: 0, redraw: false }
                    }
                ],
                label: 'Pause'
            }]
        }],
        sliders: [{
            pad: { l: 130, t: 55 },
            currentvalue: {
                visible: true,
                prefix: 'Date and Time:',
                xanchor: 'right',
                font: {
                    size: 20,
                    color: '#666'
                }
            },
            steps: sliderSteps
        }]
    };
    return (
        <Plot
            data={traces}
            layout={layout}
            frames={frames}
        />
    );
}

    // //create slider steps for each hour
    // let sliderSteps = [];
    // for (let i = 0; i < hours.length; i++) {
    //     sliderSteps.push({
    //         label: 'Hour ' + (i + 1),
    //         method: 'animate',
    //         args: [['frame' + i], {
    //             mode: 'immediate',
    //             transition: { duration: 300 },
    //             frame: { duration: 300, redraw: false },
    //         }]
    //     });
    // }
    // //create layout
    // let layout = {
    //     xaxis: {
    //         title: 'LMP of Scenario 1'
    //     },
    //     yaxis: {
    //         title: 'LMP of Scenario 2'
    //     },
    //     title: 'Scatterplot of LMPs',
    //     font: {
    //         family: 'Courier New, monospace',
    //         size: 16,
    //         color: 'black'
    //     },
    //     paper_bgcolor: 'rgba(0,0,0,0)',
    //     plot_bgcolor: 'rgba(0,0,0,0)',
    //     updatemenus: [{
    //         x: 0.1,
    //         y: 0,
    //         yanchor: 'top',
    //         xanchor: 'right',
    //         showactive: false,
    //         direction: 'left',
    //         type: 'buttons',
    //         pad: { t: 87, r: 10 },
    //         buttons: [{
    //             method: 'animate',
    //             args: [null, {
    //                 fromcurrent: true,
    //                 transition: { duration: 300 },
    //                 frame: { duration: 500, redraw: false },
    //             }],
    //             label: 'Play'
    //         }, {
    //             method: 'animate',
    //             args: [[null], {
    //             mode: 'immediate',
    //             transition: {duration: 0},
    //             frame: {duration: 0, redraw: false}
    //             }],
    //             label: 'Pause'
    //         }]
    //     }],
    //     sliders: [{
    //         active: 0,
    //         steps: sliderSteps,
    //         x: 0.1,
    //         len: 0.9,
    //         xanchor: 'left',
    //         currentvalue: {
    //             visible: true,
    //             prefix: 'Hour:',
    //             xanchor: 'right',
    //             font: {
    //                 size: 20,
    //                 color: '#666'
    //             }
    //         },
    //         steps: sliderSteps
    //     }]
    // };
    // //create config
    // let config = {
    //     displayModeBar: false
    // };
    //PRINT scenarioLMPs
//     console.log(scenarioLMPs);
//     console.log(hours);
//     return (
//         <Plot
//             data={traces}
//             layout={layout}
//             frames={frames}
//             config={config}
//             useResizeHandler={true}
//             style={{ width: "100%", height: "100%" }}
//         />
//     );
// }