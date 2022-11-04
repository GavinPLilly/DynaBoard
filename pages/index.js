import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import profilePic from '../public/dyna.jpeg'
import Link from 'next/link';


export default function Home() {
  return (
<div>
<div className={styles.bgWrap}>
<Image src={profilePic} alt="pic" placeholder="blur" 
        quality={100}
        fill="true"
        sizes="100vw"
        style={{
          objectFit: 'cover'
        }}/>

</div>
<div className={styles.topnav}>
<h3 className={styles.topnavimg}>
<Image src="/favicon.ico" width={40} height={40} />
</h3>
   Reliable Electricity. Competitive Prices. Clean-Energy Transition.
</div>
<div className={styles.main}>
<h1 className={styles.title}>DynaBoard</h1>
<p className={styles.description}>Choose one of the following:</p> 
<div className={styles.grid}>
          <div className={styles.card}>
            <h2><Link href="usecase2">Single Scenario &rarr; </Link></h2>
            <p>Obtain metrics for a single scenario.</p>
            </div>

          <div className={styles.card}>
          <h2><Link href="usecase1">Multiple Scenarios &rarr; </Link></h2>
            <p>Compare multiple scenarios against each other.</p>
          </div>
</div>  
</div>
</div>
)
      }
