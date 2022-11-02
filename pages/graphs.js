import dynamic from 'next/dynamic'
import React from 'react'
import Head from 'next/head'

const DynamicPlot = dynamic(import('./line'), {
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
      </React.Fragment>
    )
  }