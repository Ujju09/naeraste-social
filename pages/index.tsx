'use client';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Script from 'next/script'
import { useState } from 'react'
const Home: NextPage = () => {
  const grades = [9,10,11,12];
  const [grade, setGrade] = useState(9);
  return (
    <div className={styles.container}>
      <Head>
        <title>nae raste</title>
        <meta name="description" content="Superpowered notebooks" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
        <meta name="google-site-verification" content="SlF8pulxb_3mPZEUyISxKfwbgxW33EPV7eGacqL8sa4" />
      </Head>

      <main className={styles.main}>
      <div className={styles.title}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            backgroundColor: '#f9f9f9',

            
          }}>
            <Image src="/nrsvg.svg" alt="näraste" width={50} height={50} />
            


            <h2 className={styles.h2}>
          social science
            </h2>
            

          </div>
        
        
        </div>

        <p className={styles.description}>
          <span>
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
        <div  className={styles.card}>
          <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0.5rem",
          }}
        >
        </div>
        <h3>{"Learning Resources"}</h3>
        <p>{"Most of social science is stories and facts. And we will help you remember them using technology aided learning. "}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Link
            href={{
              pathname: "/resources",
              query: { grade: grade },
            }}
          >
            <button className={styles.button}>Explore</button>
          </Link>
        </div>
         
          
        </div>
        </div>
        </div>
      </main>
   
      <Script async data-uid="b3ea752d78" src="https://artisanal-producer-6695.ck.page/b3ea752d78/index.js"></Script>
    </div>
  )
}

export default Home
