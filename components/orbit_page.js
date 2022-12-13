import Script from "next/script"
import Image from "next/image"
import NoContent from "./no_content"
import Contribute from "./contibute"


export default function OrbitList({ records }) {

    return (
        <section>
            <Script
        type="module"
        src="https://js.withorbit.com/orbit-web-component.js"
      />

      {records.fields.hasOwnProperty("Question (from Notes)") === false ? (
         <NoContent/>) : (
          <>
            <div
              style={{
                display: "flex",
                marginBottom: "1rem",
                marginTop: "1rem",
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
            <Contribute />
           
            
          </>
        )}
        </section>
    )
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