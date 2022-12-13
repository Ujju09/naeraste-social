import styles from "../styles/Home.module.css";

export default function Contribute() {
    const helpText = `I want to share questions/notes/resources with you.`;
    const encoded = encodeURI(helpText);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Want to Cat⎯Tribute?
          <button className={styles.button}>
            <a
              href={`https://wa.me/919755992478?text=${encoded}`}
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Text the kitty
            </a>
          </button>

          </div>
    )
}