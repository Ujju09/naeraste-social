/** @format */

import styles from "../styles/Home.module.css";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

export default function Resource({ records }) {
  const helpText = `I want to share ${records.fields["Chapter Name"]} questions with you.`;
  const encoded = encodeURI(helpText);
  return (
    <div className={styles.container}>
      <Script
        type="module"
        src="https://js.withorbit.com/orbit-web-component.js"
      />
      <Head>
        <title>{records.fields["Chapter Name"]}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>nae raste │ ✍️</h1>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            marginTop: "1rem",
            textAlign: "center",
            color: "#D05E70",
          }}
        >
          {records.fields["Chapter Name"]}
        </p>
        {records.fields.hasOwnProperty("Question (from Notes)") === false ? (
          <div className={styles.practiceCard}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image
                  src="/orbit.svg"
                  width={50}
                  height={50}
                  alt="Orbit Logo"
                />
                <h3> Chance to win exciting rewards </h3>
              </div>
              <p
                style={{
                  paddingLeft: "0.85rem",
                  fontWeight: "300",
                }}
              >
                Orbit helps you remember important facts and formulas.
                Currently,{records.fields["Chapter Name"]} contains no
                questions. Contribute questions and answers and win exciting
                gifts. 🎁
              </p>
              <button className={styles.button}>
                <a
                  href={`https://wa.me/919755992478?text=${encoded}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Share Qs on WhatsApp
                </a>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                marginBottom: "1rem",
              }}
            >
              <Image
                src="/orbit.svg"
                alt="Orbit image"
                width={100}
                height={100}
              />
              <p>Deeply internalize ideas and facts through periodic review.</p>
            </div>
            <orbit-reviewarea
              color="orange"
              style={{
                width: "100%",
              }}
            >
              {records.fields["Question (from Notes)"].map(
                (question, index) => (
                  <orbit-prompt
                    question={question}
                    answer={records.fields["Answer (from Notes)"][index]}
                    key={index}
                  ></orbit-prompt>
                )
              )}
            </orbit-reviewarea>
            Want to Contribute Questions ?
            <button className={styles.button}>
              <a
                href={`https://wa.me/919755992478?text=${encoded}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Share Qs on WhatsApp
              </a>
            </button>
          </>
        )}
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
