import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic';
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { IPostsProps } from '../../models/Posts';
import { CardPost } from '../../components/CardPost';

import styles from '../../styles/posts.module.scss'

import { GetServerSideProps, GetStaticProps } from 'next';

interface IPostProp {
  posts: {
    slug: string;
    tag: string;
    title: string;
    thumb: string;
    content: string;
    updatedAt: string;
  }
}

export default function frontEnd({ posts }: IPostProp) {
  return (
    <div className={styles.container}>
      <Head>
        <title>WillDev - Front-End</title>
      </Head>
      <main>
        <div className={styles.containerPosts}>
          <h2>{posts.title}</h2>
          <time>{posts.updatedAt}</time>
          <div
            dangerouslySetInnerHTML={{ __html: posts.content }}            
          />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const prismic = getPrismicClient(req);
  const { slug }: any = params;
  
  const response = await prismic.getByUID("posts", String(slug), {});
     
  const date: any = response.last_publication_date;
  
  const posts = {
    slug,
    tag: response.tags[0] ?? "",
    title: RichText.asText(response.data.title),
    thumb: response.data.thumb,
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  };
  
  return {
    props: {
      posts
    }
  }
}