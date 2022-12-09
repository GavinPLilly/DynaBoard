import React from "react";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// create and return two histograms as subplots
export default function dualHist () {
    //fetch api data
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/lmps')
            .then(response => response.json())
            .then(data => setData(data));
    }
    , []);
    