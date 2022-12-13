import Image from "next/image";
import Contribute from "./contibute";



export default function NoContent() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
        }}>
            <Image src="/cat.webp" alt="empty" width={300} height={300} />
            <p>Meow, there is nothing here.</p>
            <Contribute/>
        </div>
    );
}