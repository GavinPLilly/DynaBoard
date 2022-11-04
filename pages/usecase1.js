



import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import profilePic from '../public/dyna.jpeg'
import Link from 'next/link';

export default function Home() {
  return (
    <div>
<div className={styles.topnav}>
<h3 className={styles.topnavimg}>
<Image src="/favicon.ico" width={40} height={40} /> 
</h3>
   Reliable Electricity. Competitive Prices. Clean-Energy Transition.
</div>
    <div className={styles.main}>
    <div className={styles.grid}>
              <div className={styles.card}>
              <h2><Link href="/api/GET/node-data">API test</Link></h2>

                <p>Test the API</p>
                </div>
                <div className={styles.card}>
              <h2><Link href="/">Return</Link></h2>
                <p>Back to homepage</p>
                </div>

    </div>  
    </div>
    </div>
)}