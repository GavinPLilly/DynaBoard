import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from 'react';

  const BarGraph = dynamic(import('./bar'), {ssr:false})
  const HeatMap = dynamic(import('./heat'), {ssr:false})
  const SingleScenarioLineGraph = dynamic(import('./uc1LineChart'), {ssr:false})

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


export default function use1() {
  const filter_data = (node_data, data_category, scenario, node_names) => {
    if(data_category == 0) {
      set_filtered_data([]);
      return;
    }
    //if node_names is empty, consider all nodes
    if(node_names.length == 0) {
      node_names = [...new Set(node_data.map(item => item.pnode_name))];
    }
    //if data category is 0, consider the first category
    if(data_category == 0) {
      data_category = 'LMP';
    }
    //if scenario is 0, consider the first scenario
    if(scenario == 0) {
      scenario = 1;
    }
    const new_data = node_data.filter(e => {
      return e.scenario_id == scenario && node_names.includes(e.pnode_name);
    });
    set_filtered_data(new_data);
    // console.log('contains: ');
    // console.log(node_names.includes(".I.KENT    345 2"));
    // console.log('node_names: ');
    // console.log(node_names);
    // console.log('filtered data: ');
    // console.log(filtered_data);
  }

  const [all_data, set_all_data] = useState([]);
  const [filtered_data, set_filtered_data] = useState([]);
  const [data_category, set_data_category] = useState(0);
  const [scenario, set_scenario] = useState(0);
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
    { label: 'LMP', value: 1}
  ];
  // let scenario_ids = [...new Set(data.map(item => item.scenario_id))];
  const scenario_ids = [
	  { label: '1', value: 1 },
	  { label: '2', value: 2 },
	  { label: '3', value: 3 }
  ]
  let pnode_names = [...new Set(all_data.map(item => item.pnode_name))];
  // console.log('pnode_names: ');
  // console.log(pnode_names);
  return (
    <div>
      <div className={styles.topnav}>
        <h3 className={styles.topnavimg}>
        <Image src="/favicon.ico" width={40} height={40} /> 
        </h3>
          Reliable Electricity. Competitive Prices. Clean-Energy Transition.
      </div>
      <div className = {styles.row}>
  
        <div className ={styles.firstcolumn}>



      Data Category: <Select     //creates singular dropdown component (insert wherever u want it )
      styles={customStyles}
  
      isMulti={false}
      autosize={false}

        onChange={handle_data_category_change}
        options={data_categories}
        defaultValue={data_categories[0]}
        theme={(theme) => {
          // console.log(theme)
          return {
          ...theme,
          borderRadius: 0,
          autosize:false,
          colors: {
          ...theme.colors,
          text: '#3599B8',
          font:'#3599B8',
          primary25: '#3599B8',
          primary: '#3599B8',
          neutral80: 'black',
          color: 'black',
          },
        }}
      }
      />
      <br/>

Node Name: <Select     //creates singular dropdown component (insert wherever u want it )
      styles={customStyles}
  
      isMulti="true"
      autosize={false}

        onChange={handle_node_names_change}
        options = {pnode_names.map(pnode_name => (
            { label: pnode_name, value: pnode_name }
          ))
        }
        theme={(theme) => {
          // console.log(theme)
          return {
          ...theme,
          borderRadius: 0,
          autosize:false,
          colors: {
          ...theme.colors,
          text: '#3599B8',
          font:'#3599B8',
          primary25: '#3599B8',
          primary: '#3599B8',
          neutral80: 'black',
          color: 'black',
          },
        }}
      }
      />




          <BarGraph data={filtered_data}/>
        </div>
        <div className ={styles.firstcolumn}>
       Scenario ID: <Select     //creates singular dropdown component (insert wherever u want it )
      styles={customStyles}
  
      isMulti={false}
      autosize={false}

        onChange={handle_scenario_change}
        options={scenario_ids}
        defaultValue={scenario_ids[0]}
        theme={(theme) => {
          // console.log(theme)
          return {
          ...theme,
          borderRadius: 0,
          autosize:false,
          colors: {
          ...theme.colors,
          text: '#3599B8',
          font:'#3599B8',
          primary25: '#3599B8',
          primary: '#3599B8',
          neutral80: 'black',
          color: 'black',
          },
        }}
      }
      />
    <br/>
          <SingleScenarioLineGraph data={filtered_data}/>
        </div>
        <div className ={styles.column2}>
          <HeatMap />
        </div>
      </div>
    </div>
)}
