import Head from 'next/head'
import dynamic from 'next/dynamic'
import React from 'react'

const LineGraph = dynamic(import('./line'), {
  ssr: false
})

const BarGraph = dynamic(import('./bar'), {
  ssr: false
})

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>Next Plotly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LineGraph />
      <BarGraph />
    </React.Fragment>
  )
}