import Image from 'next/image'
import styles from '../styles/usecase2.module.css'
import dynamic from 'next/dynamic';
import React from 'react';
import Select from 'react-select';
import { useState, useEffect, useCallback } from 'react';
import Header from '../Components/Header';
import Title from '../Components/Title';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LineGraph = dynamic(import('./line'), { ssr: false })
const ScatterPlot = dynamic(import('./scatterplot'), { ssr: false })
const MAPEBar = dynamic(import('./MAPEBar'), { ssr: false });
const DualHistogram = dynamic(import('./dual-hist'), { ssr: false })

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
const aquaticCreatures = [ //whatever list ex. list of countries
  { label: 'a', value: 'a' },
  { label: 'b', value: 'bn' },
  { label: 'c', value: 'c' },
  { label: 'd', value: 'd' },
  { label: 'e', value: 'e' },
  { label: 'f', value: 'f' },
];


export default function use2() {
  const onDateChange = useCallback((date) => {
    setValue(date);
  }, []);
  const filter_data = (node_data, data_category, scenario1, scenario2, node_names) => {
    
    if (node_names.length == 0) {
      node_names = [...new Set(node_data.map(item => item.pnode_name))];
    }
    let new_data = node_data.filter(e => {
      return node_names.includes(e.pnode_name) && (e.scenario_id == scenario1 || e.scenario_id == scenario2);
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

  useEffect(() => {
    fetch('/api/GET/dummy-data')
      .then(response => response.json())
      .then(
        all_data => set_all_data(all_data));
  }, []);

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

  const [data_category, set_data_category] = useState('LMP');
  const [scenario, set_scenario] = useState(1);
  const [node_names, set_node_names] = useState(pnode_names);
  const [selectedDate,setSelectedDate] = useState(null); //date
  const [eselectedDate,esetSelectedDate] = useState(null); //date
  const [scenario2, set_scenario2] = useState(2);


  const handle_data_category_change = (selection) => {
    set_data_category(selection.value);
    filter_data(all_data, data_category, scenario, scenario2, node_names);
  }
  const handle_scenario_change = (selection) => {
    set_scenario(selection.value);
    filter_data(all_data, data_category, scenario, scenario2, node_names);
  }
  const handle_node_names_change = (selections) => {
    set_node_names(selections.map(e => e.value));
    filter_data(all_data, data_category, scenario, scenario2, node_names);
  }
  const handle_date_change = (date) => {
    esetSelectedDate(date);
    //believe you can obtain these with day = date.Day, date.Month,date.Year
  }
  const handle_scenario_change2 = (selection) => {
    set_scenario2(selection.value);
    filter_data(all_data, data_category, scenario, scenario2, node_names);
  }
  console.log('filtered data: ');
  console.log(filtered_data);
  // console.log('got data: ');
  // console.log(data);
  return (
    <div>
      <Head>
        <title>DynaBoard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Title title="Compare" description="[two datasets]" />

      <div className={styles['step']}>1. Select First Dataset</div>
      <div className={styles['inputs']}>
        <div>
          Data Category: <Select     //creates singular dropdown component (insert wherever u want it )
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
        <div>
          Node Name: <Select
            styles={customStyles}
            isMulti={true}
            autosize={false}
            onChange={handle_node_names_change}

            options={pnode_names.map(e => { return { label: e, value: e } })}
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
        <div>Start Date: <DatePicker styles={customStyles} minDate={new Date('11-11-2022')} maxDate={new Date('11-20-2022')} selected = {selectedDate} onChange={date=>setSelectedDate(date)}/></div> 
        <div>End Date: <DatePicker styles={customStyles} selected = {eselectedDate} onChange={date=>handle_date_change(date)}/></div>

        <div>
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
        </div>
      </div>

      <div className={styles['step']}>2. Select Second Scenario</div>
      <div className={styles['inputs']}>
        <div>
          Scenario ID: <Select     //creates singular dropdown component (insert wherever u want it )
            styles={customStyles}

            isMulti={false}
            autosize={false}

            onChange={handle_scenario_change2}
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
        </div>
      </div>


      <div className={styles['step']}>3. View Graphs & Statistics</div>
      <div className={styles['data']}>
        <LineGraph data={filtered_data} />
        <DualHistogram data={filtered_data} />
        <MAPEBar data={filtered_data} />
        <ScatterPlot data={filtered_data} />
      </div>
    </div>
  )
}
