import React from "react";
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

var xValues = ['01', '02', '03', '04', '05', '06', '07','08','09','10','11','12'];
var yValues = ['01', '02', '03', '04', '05', '06', '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
var zValues = [
    ['8', '11', '8', '15', '14', '10', '9', '14', '8', '9', '8', '11'],
    ['12', '15', '10', '12', '9', '15', '10', '14', '11', '12', '13', '9'],
    ['13', '8', '15', '10', '13', '14', '9', '12', '9', '13', '12', '12'],
    ['11', '12', '9', '8', '15', '11', '10', '15', '11', '12', '10', '15'],
    ['14', '8', '9', '12', '9', '13', '15', '15', '9', '15', '12', '10'],
    ['15', '9', '11', '14', '14', '13', '12', '8', '8', '9', '11', '13'],
    ['8', '8', '9', '11', '15', '10', '8', '10', '8', '10', '13', '9'],
    ['9', '8', '15', '12', '14', '11', '10', '15', '9', '12', '11', '13'],
    ['10', '11', '9', '12', '11', '13', '10', '9', '13', '9', '12', '11'],
    ['13', '15', '10', '15', '12', '15', '9', '9', '14', '11', '12', '14'],
    ['10', '14', '8', '10', '11', '15', '14', '10', '10', '8', '11', '10'],
    ['13', '11', '14', '11', '15', '12', '12', '10', '12', '11', '9', '12'],
    ['11', '13', '15', '14', '12', '8', '10', '11', '13', '12', '9', '10'],
    ['11', '15', '13', '13', '13', '11', '8', '12', '14', '11', '11', '13'],
    ['9', '11', '9', '9', '15', '14', '9', '13', '8', '14', '8', '8'],
    ['12', '14', '13', '11', '10', '14', '15', '11', '14', '9', '11', '8'],
    ['14', '11', '11', '10', '12', '10', '13', '8', '12', '11', '14', '10'],
    ['15', '11', '13', '10', '13', '15', '8', '14', '14', '10', '15', '14'],
    ['12', '12', '13', '12', '8', '12', '15', '10', '9', '8', '10', '9'],
    ['8', '13', '10', '9', '13', '8', '13', '11', '8', '14', '8', '10'],
    ['12', '11', '8', '8', '13', '9', '14', '11', '13', '12', '10', '14'],
    ['10', '13', '15', '11', '10', '15', '15', '11', '9', '13', '8', '13'],
    ['15', '8', '13', '13', '12', '11', '11', '8', '9', '14', '11', '15'],
    ['15', '15', '8', '14', '11', '8', '11', '12', '9', '15', '15', '11'],
];

var layout = {
    yaxis: {title: {text: 'Hour'}, ticks: '', side: 'top'}, 
    xaxis: {title: {text: 'Day'}, ticks: '', ticksuffix: ' '},
    width: 600, 
    height: 600, 
    title: 'Heat Map Example',
    annotations: []
// font: {
//   family: 'Courier New, monospace',
//   size: 16,
//   color: 'white'
// }, paper_bgcolor: 'rgba(0,0,0,0)',
// plot_bgcolor: 'rgba(0,0,0,0)'
}

// for ( var i = 0; i < yValues.length; i++ ) {
//     for ( var j = 0; j < xValues.length; j++ ) {
//       var currentValue = zValues[i][j];
//       if (currentValue != 0.0) {
//         var textColor = 'white';
//       }else{
//         var textColor = 'black';
//       }
//       var result = {
//         xref: 'x1',
//         yref: 'y1',
//         x: xValues[j],
//         y: yValues[i],
//         text: zValues[i][j],
//         font: {
//           family: 'Arial',
//           size: 12,
//           color: 'rgb(50, 171, 96)'
//         },
//         showarrow: false,
//         font: {
//           color: textColor
//         }
//       };
//       layout.annotations.push(result);
//     }
//   }

function transpose(a) {

  // Calculate the width and height of the Array
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
}


export default function heat ({heat_map_data}) {
    let dates = []; //store date
    //store lmps for each date
    let lmps = [];
    //add each date to dates for x axis
    heat_map_data.forEach(heat_map_data => {
        if (!dates.includes(heat_map_data.date)) {
            dates.push(heat_map_data.date);
        }
    });
    //sort dateAndHour and store it in dateAndHour
    dates.sort();
    //for each date
    dates.forEach(date => {
        let dtc = [];
        //for each node
        heat_map_data.forEach(heat_map_data => {
            //if the node has heat_map_data for that date
            if (heat_map_data.date == date) {
                //add the lmp to the lmp array
                dtc.push(heat_map_data.lmp);
            }
        });
        //add the average of lmp array to the lmps array
        // lmps.push(dtc.reduce((a, b) => a + b, 0) / dtc.length);
        lmps.push(dtc);
    });

    // lmps = transpose(lmps);

    let data = [{
        x: dates,
        y: yValues,
        z: lmps,
        type: 'heatmap',
        name: 'HeatMap '
    }];

    return (
      <Plot
        data={data}
        layout={layout}
      />
    );
}

