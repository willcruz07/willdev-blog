import React from "react";
import { GetStaticProps } from 'next';
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic';
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { IPostsProps } from '../../models/Posts';
import { CardPost } from '../../components/CardPost';

import styles from '../../styles/home.module.scss'
import { Search } from '../../components/Search';

export default function FrontEnd({ posts }: IPostsProps) {
  const [listPost, setListPost] = React.useState(posts);
  const [fullListPost, setFullListPost] = React.useState(posts);

  return (
    <div className={styles.container}>
      <Head>
        <title>WillDev - Front-End</title>              
      </Head>

      <main>
        <Search
          listPost={fullListPost}
          setList={setListPost}
        />

        <div className={styles.containerGridCardPost}>
          {listPost.map(post => (
              <CardPost
                key={post.slug}
                slug={post.slug}
                thumb={post.thumb}
                tech={post.tag}
                title={post.title} 
                datePost={post.updatedAt}
              />
            ))} 
          </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at("document.type", "posts"),
    Prismic.Predicates.at("document.tags", ["Front-End"])],
    {      
      pageSize: 100,
    });
     
  const posts = response.results.map(post => {
    const date: any = post.last_publication_date;    

    return {
      slug: post.uid,
      tag: post.tags[0] ?? "",
      title: RichText.asText(post.data.title),
      thumb: post.data.thumb,
      excerpt: post.data.content.find((content: any) => content.type === "paragraph")?.text ?? "",
      updatedAt: new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }
  })
  
  return {
    props: {
      posts
    },
    revalidate: 60, // um minuto
  }
}