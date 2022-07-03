import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Newsletter from '../components/newsletter'
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>naeRaste</title>
        <meta name="description" content="Superpowered notebooks" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         naeRaste │
         नए रास्ते
        
        </h1>

        <p className={styles.description}>
          Class 9/Social Sciences</p>
        <div className={styles.grid}>
          <Link href= "/resources" >
            <a className={styles.card}>
            <Image src="/learn.svg" alt="LEarning resources" width={200} height={200}  priority/>

            <h3 style={{
              color:'#5967E5'
            }}>Tools for thoughts &rarr;</h3>
            </a>
          </Link>
         
          
        </div>
      </main>

      <Newsletter />
    </div>
  )
}

export default Home
