import Link from "next/link";
import styles from "./styles.module.scss";

interface ICardPostProps {
  slug: string;
  thumb: any;
  title: string;
  datePost: string;
  tech: string;
}

export const CardPost = ({ datePost, tech, thumb, title, slug }: ICardPostProps) => {
  
  return (
    <Link href={`/${tech.toLowerCase()}/${slug}`} >
      <div className={styles.cardPost}>
        <article style={{
          backgroundImage: `url(${thumb.url})`,
          backgroundRepeat: "no-repeat center center",
          width: "100%",
          height: "100%",
          backgroundSize: "cover"
        }}>
          <h2 className={styles.titleCard}>{title}</h2>
          <time
            className={styles.dateCard}
            dateTime={datePost}>
            {datePost}
          </time>

          <Link href={`/${tech.toLowerCase()}`}>
            <a className={styles.linkTech}>{tech}</a>
          </Link>
        </article>
     </div>
    </Link>  
  )

}