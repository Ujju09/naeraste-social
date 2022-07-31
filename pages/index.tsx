import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Newsletter from '../components/newsletter'
import { useState } from 'react'
const Home: NextPage = () => {
  const grades = [9,10,11,12];
  const [grade, setGrade] = useState(9);
  return (
    <div className={styles.container}>
      <Head>
        <title>naeRaste</title>
        <meta name="description" content="Superpowered notebooks" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
        <meta name="google-site-verification" content="SlF8pulxb_3mPZEUyISxKfwbgxW33EPV7eGacqL8sa4" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         naeRaste │
         नए रास्ते
        
        </h1>

        <p className={styles.description}>
          social science <br/><span>
          <label>select your class </label>  
            <select style={{
              width: '100px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              padding: '5px',
              fontSize: '1.5rem',
              color: 'black',
              backgroundColor: "#f5f5f5",
             

            }} onChange={
              (e) => {
                setGrade(parseInt(e.target.value));
              }

            }
            defaultValue={grade}>
          
              {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
            </select>  
          
            </span></p>
        <div className={styles.grid}>
        <Link href= {
            {
              pathname: '/resources',
              query: {
                grade: grade
              }
            }
            
          } >
            <a className={styles.card}>
            <Image src="/learn.svg" alt="LEarning resources" width={100} height={100}  priority/>

            <h3 style={{
              color:'#5967E5'
            }}>Learning Resources</h3>
            </a>
          </Link>
         
          
        </div>
      </main>

      <Newsletter />
    </div>
  )
}

export default Home
