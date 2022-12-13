/** @format */

import styles from "../styles/Home.module.css";
import VideosList from "../components/video_lists";
import Head from "next/head";
import OrbitList from "../components/orbit_page";
import Image from "next/image";
import { useState } from "react";
import QuestionSets from "../components/question_sets";
import NotesList from "../components/notes_list";


export default function Resource({ records }) {

  const [active, setActive] = useState(1);
  const handleClick = (e, n) => {
    e.preventDefault();
    setActive(n);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{records.fields["Chapter Name"]}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <main className={styles.main}>
      <div className={styles.title}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',

            
          }}>
            <Image src="/bookmark-orange.png" alt="näraste" width={39.68} height={50} />
          </div>
        
        
        </div>

        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            paddingTop:"3rem",
            marginBottom: "1rem",
            marginTop: "1rem",
            textAlign: "center",
            color: "#D05E70",
          }}
        >
          {records.fields["Chapter Name"]}
        </p>
        <div className={styles.topicList}>
          <div  className={
            active === 1 ? styles.topicActive : styles.topic
          } onClick={(e)=> handleClick(e,1)}>
            Videos
          </div>
          <div className={
            active === 2 ? styles.topicActive : styles.topic
          } onClick={(e)=> handleClick(e,2)} >
            Orbit
            </div>
          <div className={
            active === 3 ? styles.topicActive : styles.topic
          } onClick={(e)=> handleClick(e,3)}>
            Question Sets
            </div>
            <div className={
            active === 4 ? styles.topicActive : styles.topic
          } onClick={(e)=> handleClick(e,4)}>
              Notes
            </div>
        </div>
       {
        active === 1 ? <VideosList records={records} /> : <></>
       }
        {
        active === 2 ? <OrbitList records={records} />: <></>
       }
       {
        active === 3 ? <QuestionSets/> : <></>
       }
       {
        active === 4 ? <NotesList/> : <></>
       }
        
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(
    `https://api.airtable.com/v0/appL3eEYotbT6ZB0m/Social/${id}`,
    {
      headers: { Authorization: `Bearer ${PUBLIC_API_KEY}` },
    }
  );

  const records = await res.json();

  return {
    props: { records: records }, // will be passed to the page component as props
  };
}
