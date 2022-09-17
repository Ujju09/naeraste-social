/** @format */

import { createClient } from "contentful";

export default function Articles({ articles }) {
  return (
    <>
      Articles
    </>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  //content type written in lower camael case.
  const res = await client.getEntries({
    content_type: "socialArticles",
  });

  return {
    props: {
      articles: res.items,
    },
  };
}
