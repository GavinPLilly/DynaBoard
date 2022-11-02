import dynamic from 'next/dynamic'
import React from 'react'
import Head from 'next/head'

const DynamicPlot = dynamic(import('./line'), {
    ssr: false
  })
  
const DynamicPlot2 = dynamic(import('./bar'), {
    ssr: false
  })  
  
  export default function Home() {
    return (
      <React.Fragment>
        <Head>
          <title>Next Plotly</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DynamicPlot />
        <DynamicPlot2 />
      </React.Fragment>
    )
  }