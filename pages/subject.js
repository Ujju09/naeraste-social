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
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>naeRaste │ ✍️</h1>
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
          <>
            Nothing here yet!
            <Image src="/silence.png" alt="No image" width={200} height={200} />
            <h2>Want to contribute?</h2>
            <p>
              Send your questions to{" "}
              <span>
                <button className={styles.button}>
                  <a
                    href={`https://wa.me/919755992478?text=${encoded}`}
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    Ujjwal ↗
                  </a>
                </button>
              </span>
            </p>
          </>
        ) : (
          <orbit-reviewarea
            color="orange"
            style={{
              width: "100%",
            }}
          >
            {records.fields["Question (from Notes)"].map((question, index) => (
              <orbit-prompt
                question={question}
                answer={records.fields["Answer (from Notes)"][index]}
                key={index}
              ></orbit-prompt>
            ))}
          </orbit-reviewarea>
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
