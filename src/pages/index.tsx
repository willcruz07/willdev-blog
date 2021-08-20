import { GetStaticProps } from 'next'
import Head from 'next/head'
import { CardPost } from '../components/CardPost'
import { getPrismicClient } from '../services/prismic'

import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import styles from '../styles/home.module.scss'

import { IPostsProps } from '../models/Posts';

export default function Home({ posts }: IPostsProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>WillDev</title>              
      </Head>
      <header className={styles.containerHeader}>
        <img className={styles.shadow_drop_2_center} src="/image/me.jpg" alt="Will Cruz" />
        <div>
          <h3>✌️ Hello Dev !!!</h3>

          <p>Me chamo Will Cruz e o meu intuito aqui é compartilhar um pouquinho
            do conhecimento que venho adquirindo nestes anos como dev.</p>
          
          <p>Aqui você vai encontrar dicas de front com React JS, Mobile com
            React Native e backend com NodeJs</p>
          
          <p>Então sem mais delongas "Bora codar...</p>
        </div>
      </header>
      <main>        
        <div className={styles.containerGridCardPost}>
          {posts.map(post => (
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
    [Prismic.Predicates.at("document.type", "posts")],
    {      
      pageSize: 12,
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
    }    
  }
}