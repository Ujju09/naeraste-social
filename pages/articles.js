/** @format */

import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Articles({ articles }) {
  console.log(articles);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) => `<h1>${next(node.content)}</h1>`,
      [BLOCKS.HEADING_2]: (node, next) => `<h2>${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
      [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
      [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
      [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
      [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {},
      [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
      [BLOCKS.QUOTE]: (node, next) =>
        `<blockquote>${next(node.content)}</blockquote>`,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {},
      [BLOCKS.HR]: () => `<hr />`,
    },
  };
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
          <div
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(article.fields.summary, options),
            }}
          />
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
