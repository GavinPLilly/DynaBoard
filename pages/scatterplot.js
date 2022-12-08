import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function line () {
    //fetch data from api and set to data
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/GET/node-data')
            .then(response => response.json())
            .then(
                data => setData(data));
    }, []);
    //store lmps of all nodes by hour for each scenario
    let scenarioLMPs = [];
    //store all scenarios
    let scenarios = [...new Set(data.map(item => item.scenario_id))];
    //for each scenario
    scenarios.forEach(scenario => {
        //get data for that scenario
        let scenarioData = data.filter(data => data.scenario_id == scenario);
        //store hours
        let hours = [];
        //store lmps for each hour
        let lmps = [];
        //for each hour
        scenarioData.forEach(data => {
            if (!hours.includes(data.hour)) {
                hours.push(data.hour);
            }
        });
        //for each hour
        hours.forEach(hour => {
            //store lmps for that hour
            let lmp = [];
            //for each node
            scenarioData.forEach(data => {
                //if the node has data for that hour
                if (data.hour == hour) {
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
    let hours = [];
    let scenarioData = data.filter(data => data.scenario_id == 1);
    scenarioData.forEach(data => {
        if (!hours.includes(data.hour)) {
            hours.push(data.hour);
        }
    });
    for (let i = 0; i < hours.length; i++) {
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
    for (let i = 0; i < hours.length; i++) {
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
    for (let i = 0; i < hours.length; i++) {
        let sliderStep = {
            label: i + 1,
            method: 'animate',
            args: [[i], {
                mode: 'immediate',
                transition: { duration: 300 },
                frame: { duration: 300, redraw: false },
            }]
        };
        sliderSteps.push(sliderStep);
    }

    //create layout
    let layout = {
        title: 'Scatterplot',
        xaxis: {
            title: {
                text: 'Scenario 1'
            },
            range: [29.8, 30.3]
        },
        yaxis: {
            title: {
                text: 'Scenario 2'
            },
            range: [29, 34]
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
                        duration: 300,
                        easing: 'quadratic-in-out'
                    },
                    frame: {
                        duration: 500,
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
                prefix: 'Hour:',
                xanchor: 'right',
                font: {
                    size: 20,
                    color: '#666'
                }
            },
            steps: sliderSteps
        }],
        width: 700,
        height: 600
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