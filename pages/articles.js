/** @format */

import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Articles({ articles }) {
  console.log(articles);
  return (
    <main className={styles.main}>
      <h1>Summaries</h1>
      {articles.map((article) => (
        <div key={article.sys.id} className={styles.article}>
          <Image
            src={`https:${article.fields.image.fields.file.url}`}
            width={article.fields.image.fields.file.details.image.width}
            height={article.fields.image.fields.file.details.image.height}
            alt="Banner"
            className={styles.image}
          />
          <h1>{article.fields.title}</h1>
          <p>{article.fields.brief}</p>
        </div>
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  //content type written in lower camael case.
  const res = await client.getEntries({
    content_type: "booksInShort",
  });

  return {
    props: {
      articles: res.items,
    },
  };
}
