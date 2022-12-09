import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import React from 'react';
import Select from 'react-select';

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

const LineGraph = dynamic(import('./line'), {ssr:false})
const ScatterPlot = dynamic(import('./scatterplot'), {ssr:false})
export default function use2() {
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
  
      isMulti="true"
      autosize={false}

        options={aquaticCreatures}
        theme={(theme) => {
          console.log(theme)
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
          <LineGraph />
        </div>
        <div className ={styles.firstcolumn}>
        Node Name: <Select     //creates singular dropdown component (insert wherever u want it )
      styles={customStyles}
  
      isMulti="true"
      autosize={false}

        options={aquaticCreatures}
        theme={(theme) => {
          console.log(theme)
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

          <ScatterPlot />
        </div>
      </div>
    </div>
)}
