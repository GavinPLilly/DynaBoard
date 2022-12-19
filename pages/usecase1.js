import Image from 'next/image'
import styles from '../styles/usecase1.module.css'
import dynamic from 'next/dynamic';
import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Title from '../Components/Title';
import Head from 'next/head';

const BarGraph = dynamic(import('./bar'), { ssr: false })
const HeatMap = dynamic(import('./heat'), { ssr: false })
const SingleScenarioLineGraph = dynamic(import('./uc1LineChart'), { ssr: false })

const customStyles = { //only declare this once this is just to give the styles to the select component 
  menu: base => ({
    ...base,
    borderRadius: 0,
    hyphens: 'auto',
    marginTop: 0,
    textAlign: 'left',
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    backgroundColor: 'grey',
    maxHeight: '80px',
    overflowY: 'auto',
  }),
  noOptionsMessage: base => ({
    ...base,
    color: 'white',
  }),
  valueContainer: base => ({
    ...base,
    overflowX: 'hidden',
    overflowY: 'scroll',
    display: 'inline-block',
    ...base,
    width: '50px',
    overflow: "hidden",
    height: '30px',
  }),
  input: base => ({
    ...base,
    overflowY: 'scroll',

    display: "inline-block",
    width: '50px',
    overflow: "hidden",
    height: '30px',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'black',
    padding: 20,
    valueContainer: base => ({
      ...base,
      overflowY: 'scroll',
      display: "inline-block",
      overflow: "hidden",
      width: '50px',
      height: '30px',


    })

  })
}

function median(arr) {
  if (arr.length == 0) {
    return 0;
  }
  arr.sort((a, b) => a.lmp - b.lmp); // 1.
  const midpoint = Math.floor(arr.length / 2); // 2.
  const median = arr.length % 2 === 1 ?
    arr[midpoint].lmp : // 3.1. If odd length, just take midpoint
    (arr[midpoint - 1].lmp + arr[midpoint].lmp) / 2; // 3.2. If even length, take median of midpoints
  return median;
}

export default function use1() {
  const filter_data = (node_data, data_category, scenario, node_names) => {
    if (data_category == 0) {
      set_filtered_data([]);
      return;
    }
    //if node_names is empty, consider all nodes
    if (node_names.length == 0) {
      node_names = [...new Set(node_data.map(item => item.pnode_name))];
    }
    const new_data = node_data.filter(e => {
      return e.scenario_id == scenario && node_names.includes(e.pnode_name);
    });
    set_filtered_data(new_data);
    const average = array => array.reduce((a, b) => a + b) / array.length;
    if (filtered_data.length == 0) {
      set_fdat_mean(0)
      set_fdat_median(0)
      set_fdat_max(0)
      set_fdat_min(0)
    }
    else {
      set_fdat_mean(filtered_data.reduce((a, b) => a + b.lmp, 0) / filtered_data.length);
      set_fdat_median(median(new_data))
      set_fdat_max(Math.max.apply(Math, filtered_data.map(e => e.lmp)));
      set_fdat_min(Math.min.apply(Math, filtered_data.map(e => e.lmp)));
      // set_fdat_min(filtered_data)
    }
  }

  const [all_data, set_all_data] = useState([]);
  const [filtered_data, set_filtered_data] = useState([]);
  const [data_category, set_data_category] = useState(0);
  const [scenario, set_scenario] = useState(1);
  const [node_names, set_node_names] = useState([]);

  const handle_data_category_change = (selection) => {
    set_data_category(selection.value);
    filter_data(all_data, data_category, scenario, node_names);
  }
  const handle_scenario_change = (selection) => {
    set_scenario(selection.value);
    filter_data(all_data, data_category, scenario, node_names);
  }
  const handle_node_names_change = (selections) => {
    set_node_names(selections.map(e => e.value));
    filter_data(all_data, data_category, scenario, node_names);
  }
  useEffect(() => {
    fetch('http://localhost:3000/api/GET/node-data')
      .then(response => response.json())
      .then(
        all_data => set_all_data(all_data));
  }, []);
  // console.log('got data: ');
  // console.log(data);
  const data_categories = [
    { label: 'LMP', value: 1 }
  ];
  // let scenario_ids = [...new Set(data.map(item => item.scenario_id))];
  const scenario_ids = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 }
  ]
  let pnode_names = [...new Set(all_data.map(item => item.pnode_name))];
  const [fdat_mean, set_fdat_mean] = useState(0);
  const [fdat_median, set_fdat_median] = useState(0);
  const [fdat_max, set_fdat_max] = useState(0);
  const [fdat_min, set_fdat_min] = useState(0);
  return (
    <div>
      <Head>
        <title>DynaBoard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Title title="Analyze" description="[one dataset]" />

      <div className={styles['step']}>1. Select Data</div>
      <div className={styles['inputs']}>
        <div className={styles['input-datacat']}>
          Data Category:
          <Select     //creates singular dropdown component (insert wherever u want it )
            styles={customStyles}
            isMulti={false}
            autosize={false}
            onChange={handle_data_category_change}
            options={data_categories}
            theme={(theme) => {
              // console.log(theme)
              return {
                ...theme,
                borderRadius: 0,
                autosize: false,
                colors: {
                  ...theme.colors,
                  text: '#3599B8',
                  font: '#3599B8',
                  primary25: '#3599B8',
                  primary: '#3599B8',
                  neutral80: 'black',
                  color: 'black',
                },
              }
            }
            }
          />
        </div>
        <br />
        <div className={styles['input-nodename']}>
          Node Name: <Select     //creates singular dropdown component (insert wherever u want it )
            styles={customStyles}

            isMulti={true}
            autosize={false}

            onChange={handle_node_names_change}
            options={pnode_names.map(pnode_name => (
              { label: pnode_name, value: pnode_name }
            ))
            }
            theme={(theme) => {
              // console.log(theme)
              return {
                ...theme,
                borderRadius: 0,
                autosize: false,
                colors: {
                  ...theme.colors,
                  text: '#3599B8',
                  font: '#3599B8',
                  primary25: '#3599B8',
                  primary: '#3599B8',
                  neutral80: 'black',
                  color: 'black',
                },
              }
            }
            }
          />
        </div>
        <br />
        <div className={styles['input-senID']}>
          Scenario ID: <Select     //creates singular dropdown component (insert wherever u want it )
            styles={customStyles}

            isMulti={false}
            autosize={false}

            onChange={handle_scenario_change}
            options={scenario_ids}
            theme={(theme) => {
              // console.log(theme)
              return {
                ...theme,
                borderRadius: 0,
                autosize: false,
                colors: {
                  ...theme.colors,
                  text: '#3599B8',
                  font: '#3599B8',
                  primary25: '#3599B8',
                  primary: '#3599B8',
                  neutral80: 'black',
                  color: 'black',
                },
              }
            }
            }
          />
          <br />
        </div>
      </div>

      <div className={styles['step']}>2. View Graphs & Statistics</div>
      <div className={styles['data']}>
        <BarGraph data={filtered_data} />
        <SingleScenarioLineGraph data={filtered_data} />
        <HeatMap />
        <div className={styles['stats']}>
          <h1>Mean: {Math.round(fdat_mean * 100) / 100}</h1>
          <h1>Median: {Math.round(fdat_median * 100) / 100}</h1>
          <h1>Min: {Math.round(fdat_min * 100) / 100}</h1>
          <h1>Max: {Math.round(fdat_max * 100) / 100}</h1>
        </div>
      </div>



      <div className={styles.row}>
        <div className={styles.column2}>

        </div>
      </div>
      <div>

      </div>
    </div>
  )
}
