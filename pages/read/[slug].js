/** @format */

import { createClient } from "contentful";
import styles from "../../styles/Home.module.css";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";

export const getStaticPaths = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  });
  const res = await client.getEntries({
    content_type: "booksInShort",
  });
  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  const { params } = context;
  const { items } = await client.getEntries({
    content_type: "booksInShort",
    "fields.slug": params.slug,
  });

  return {
    props: {
      blog: items[0],
    },
    revalidate: 24 * 60 * 60,
  };
};

const Read = ({ blog }) => {
  const { title, summary, image } = blog.fields;
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) => `<h1>${next(node.content)}</h1>`,
      [BLOCKS.HEADING_2]: (node, next) => `<h2>${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
      [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
      [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
      [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
      [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        return `<Image src="${node.data.target.fields.file.url}" width = {375} height= {150} alt="Image"/>`;
      },
      [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
      [BLOCKS.QUOTE]: (node, next) =>
        `<blockquote>${next(node.content)}</blockquote>`,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {},
      [BLOCKS.HR]: () => `<hr />`,
      [INLINES.HYPERLINK]: (node) => {
        return `<a href="${node.data.uri}">${node.content[0].value}</a>`;
      },
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        return `<a href="${node.data.uri}">${node.content[0].value}</a>`;
      },
    },
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1
          style={{
            textAlign: "center",
            margin: "4rem 1rem 2rem 1rem",
          }}
        >
          {title}
        </h1>
        <article className={styles.article}>
          <div className={styles.image}>
            <Image
              src={"https:" + image.fields.file.url}
              width={375}
              height={150}
              alt="Image"
            />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(summary, options),
            }}
          />
        </article>
      </main>
    </div>
  );
};

export default Read;
