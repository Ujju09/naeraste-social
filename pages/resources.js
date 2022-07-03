/** @format */

// import type { NextPage } from 'next'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Resource = ({ records }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>🚀 Resources</title>
        <meta name="description" content="Handpicked from the Internet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>naeRaste │ ✍️</h1>
        <p>Strengthen your memory by reviewing these chapters.</p>
        <div className={styles.grid}>
          {records.map((record, index) => (
            <Link
              key={index}
              href={{
                pathname: "/subject",
                query: {
                  id: record.id,
                },
              }}
            >
              <div className={styles.card}>
                {record.fields["Chapter Name"]} &rarr;
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

//Get server props is dope!!

export async function getStaticProps() {
  const API_KEY = process.env.API_KEY;
  const TABLE_KEY = process.env.TABLE_KEY;
  const res = await fetch(
    `https://api.airtable.com/v0/${TABLE_KEY}/Social?maxRecords=3&view=Grid%20view`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    }
  );

  const records = await res.json();

  return {
    props: { records: records.records }, // will be passed to the page component as props
  };
}

export default Resource;
